import { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

// --- Helper Components for "Personal" Tab ---
const ProfileRow = ({ label, value, colors }) => {
  const styles = getStyles(colors);
  return (
    <View style={[styles.row, styles.rowNoBorder]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { flex: 1, textAlign: "right" }]}>
        {value || "—"}
      </Text>
    </View>
  );
};
const PreferenceRow = ({ label, value, onPress, colors }) => {
  const styles = getStyles(colors);
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.changeLink}>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Helper Component for "Settings" Tab ---
const SettingsCard = ({ title, description, children, colors }) => {
  const styles = getStyles(colors);
  return (
    <View style={styles.card}>
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={styles.settingsCardTitle}>{title}</Text>
        <Text style={styles.settingsCardDescription}>{description}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

// --- Helper Component for "Notifications" Tab ---
const NotificationRow = ({ label, value, onValueChange, colors }) => {
  const styles = getStyles(colors);
  return (
    <View style={[styles.row, { paddingVertical: 20 }]}>
      <Text style={styles.value}>{label}</Text>
      <Switch
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.card}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const LecturerProfileScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { userInfo, logout } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("Personal");
  const tabs = ["Personal", "Settings", "Notifications"];

  // State for all the toggles
  const [activityLogs, setActivityLogs] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState({
    unusual: true,
    newBrowser: false,
  });
  const [newsAlerts, setNewsAlerts] = useState({
    sales: true,
    features: false,
    tips: true,
  });

  const renderPersonalTab = () => (
    <>
      <Text style={styles.sectionTitle}>Personal Information</Text>
      <View style={styles.infoCard}>
        <ProfileRow label="Name" value={userInfo?.name} colors={colors} />
        <ProfileRow label="Email" value={userInfo?.email_id} colors={colors} />
        <ProfileRow label="Role" value={userInfo?.role_name} colors={colors} />
        <ProfileRow
          label="Phone"
          value={userInfo?.phone || "-"}
          colors={colors}
        />
      </View>
      <Text style={styles.sectionTitle}>Personal Preferences</Text>
      <View style={styles.infoCard}>
        <PreferenceRow
          label="Language"
          value="English (United States)"
          onPress={() => {}}
          colors={colors}
        />
        <PreferenceRow
          label="Date Format"
          value="M d, YYYY"
          onPress={() => {}}
          colors={colors}
        />
        <PreferenceRow
          label="Timezone"
          value="Bangladesh (GMT +6)"
          onPress={() => {}}
          colors={colors}
        />
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={logout}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </>
  );

  const renderSettingsTab = () => (
    <>
      <Text style={styles.sectionTitle}>Security Settings</Text>
      <SettingsCard
        title="Save my Activity Logs"
        description="You can save all your activity logs including unusual activity detected."
        colors={colors}
      >
        <Switch
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.card}
          onValueChange={setActivityLogs}
          value={activityLogs}
        />
      </SettingsCard>
      <SettingsCard
        title="Change Password"
        description="Set a unique password to protect your account."
        colors={colors}
      >
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>Change Password</Text>
        </TouchableOpacity>
      </SettingsCard>
      <SettingsCard
        title="2FA Authentication"
        description="Secure your account with 2FA security."
        colors={colors}
      >
        <View style={styles.enabledBadge}>
          <Text style={styles.enabledBadgeText}>Enabled</Text>
        </View>
      </SettingsCard>
    </>
  );

  const renderNotificationsTab = () => (
    <>
      <Text style={styles.sectionTitle}>Notification Settings</Text>
      <Text style={styles.sectionSubtitle}>
        You will get only notification what have enabled.
      </Text>
      <View style={styles.infoCard}>
        <Text style={styles.subSectionTitle}>Security Alerts</Text>
        <NotificationRow
          label="Email me whenever encounter unusual activity"
          value={securityAlerts.unusual}
          onValueChange={() =>
            setSecurityAlerts((s) => ({ ...s, unusual: !s.unusual }))
          }
          colors={colors}
        />
        <NotificationRow
          label="Email me if new browser is used to sign in"
          value={securityAlerts.newBrowser}
          onValueChange={() =>
            setSecurityAlerts((s) => ({ ...s, newBrowser: !s.newBrowser }))
          }
          colors={colors}
        />
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.subSectionTitle}>News</Text>
        <NotificationRow
          label="Notify me by email about sales and latest news"
          value={newsAlerts.sales}
          onValueChange={() =>
            setNewsAlerts((s) => ({ ...s, sales: !s.sales }))
          }
          colors={colors}
        />
        <NotificationRow
          label="Email me about new features and updates"
          value={newsAlerts.features}
          onValueChange={() =>
            setNewsAlerts((s) => ({ ...s, features: !s.features }))
          }
          colors={colors}
        />
        <NotificationRow
          label="Email me about tips on using account"
          value={newsAlerts.tips}
          onValueChange={() => setNewsAlerts((s) => ({ ...s, tips: !s.tips }))}
          colors={colors}
        />
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
          <Text style={styles.subtitle}>Account Setting</Text>
        </View>

        <View style={styles.tabContainer}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={styles.tabButton}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[styles.tabText, isActive && styles.activeTabText]}
                >
                  {tab}
                </Text>
                {isActive && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {activeTab === "Personal" && renderPersonalTab()}
        {activeTab === "Settings" && renderSettingsTab()}
        {activeTab === "Notifications" && renderNotificationsTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { padding: 20 },
    header: { marginBottom: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: colors.text },
    subtitle: { fontSize: 16, color: colors.textSecondary, marginTop: 4 },
    tabContainer: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      marginBottom: 20,
    },
    tabButton: { marginRight: 24, paddingBottom: 12, alignItems: "center" },
    tabText: { fontSize: 16, color: colors.textSecondary },
    activeTabText: { color: colors.primary, fontWeight: "600" },
    activeTabIndicator: {
      height: 2,
      backgroundColor: colors.primary,
      width: "100%",
      position: "absolute",
      bottom: 0,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    sectionSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 16,
      lineHeight: 20,
    },
    infoCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 24,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    rowNoBorder: { borderBottomWidth: 0 },
    label: { fontSize: 14, color: colors.textSecondary },
    value: {
      fontSize: 14,
      color: colors.text,
      fontWeight: "500",
      width: "80%",
    },
    changeLink: { fontSize: 14, color: colors.primary, fontWeight: "600" },
    signOutButton: {
      backgroundColor: colors.error,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      margin: 20,
    },
    signOutButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
    placeholder: {
      padding: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    placeholderText: { color: colors.textSecondary, fontSize: 16 },
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 20,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: colors.border,
    },
    settingsCardTitle: { fontSize: 16, fontWeight: "bold", color: colors.text },
    settingsCardDescription: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
      lineHeight: 20,
    },
    settingsButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 8,
    },
    settingsButtonText: { color: colors.buttonText, fontWeight: "bold" },
    enabledBadge: {
      backgroundColor: colors.success,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 15,
    },
    enabledBadgeText: { color: colors.card, fontWeight: "600", fontSize: 12 },
    subSectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.text,
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });

export default LecturerProfileScreen;
