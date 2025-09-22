import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { AuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const CheckoutScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const route = useRoute();
  const { userInfo, userToken } = useContext(AuthContext);

  // 1. Get the plan, subjects, and price passed from the PlansScreen
  const { plan, subjects, totalPrice } = route.params;

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    // 2. API Call 1: Create an order on your backend
    try {
      const orderResponse = await axios.post(
        "https://lms.hawc.in/api/student/createorder",
        {
          user_id: 4, // Using the hardcoded fallback ID as discussed
          subscription_type_id: 1, // NOTE: This is hardcoded, make dynamic if needed
          amount: totalPrice * 100, // Convert to paise for Razorpay
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      const order = orderResponse.data.data;
      if (!order || !order.order_id) {
        throw new Error("Invalid order data received from server.");
      }

      // 3. Configure and open the native Razorpay checkout screen
      const options = {
        description: `${plan.title}`,
        image: "https://i.imgur.com/3g7nmJC.png", // Replace with your logo URL
        currency: "INR",
        key: "rzp_test_R8jWiMbBmD7tA5", // Your Razorpay Test Key
        amount: totalPrice * 100,
        name: "HAWC",
        order_id: order.order_id,
        prefill: {
          email: userInfo.email_id,
          contact: userInfo.phone || "9999999999",
          name: userInfo.name,
        },
        theme: { color: colors.primary },
      };

      RazorpayCheckout.open(options)
        .then(async (data) => {
          // 4. API Call 2: Payment is successful, send details to backend for verification
          try {
            await axios.post(
              "https://lms.hawc.in/api/student/paymentresponse",
              {
                user_id: 4, // Using hardcoded fallback ID
                razorpay_payment_id: data.razorpay_payment_id,
                razorpay_order_id: data.razorpay_order_id,
                razorpay_signature: data.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${userToken}` },
              }
            );
            Alert.alert(
              "Payment Successful!",
              "Your subscription has been activated."
            );
            navigation.navigate("Main"); // Navigate home after success
          } catch (verificationError) {
            Alert.alert(
              "Verification Failed",
              "Your payment was successful but we couldn't verify it. Please contact support."
            );
            console.error("Verification error:", verificationError);
          } finally {
            setIsProcessing(false);
          }
        })
        .catch((error) => {
          // Handle payment failure or user cancellation
          if (error.code !== 0) {
            // Code 0 is when user cancels, we can ignore it
            Alert.alert("Payment Failed", error.description);
          }
          setIsProcessing(false);
        });
    } catch (error) {
      Alert.alert("Error", "Could not create payment order. Please try again.");
      console.error("Order creation error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.summaryTitle}>Order Summary</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Plan</Text>
            <Text style={styles.value}>{plan.title}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Subjects</Text>
            <Text style={styles.value}>{subjects.join(", ")}</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹ {totalPrice}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.payButton, isProcessing && styles.disabledButton]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color={colors.buttonText} />
          ) : (
            <Text style={styles.payButtonText}>
              Proceed to Pay ₹{totalPrice}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const getStyles = (colors) =>
  StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    container: { flex: 1, padding: 20 },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 20,
    },
    title: { fontSize: 22, fontWeight: "bold", color: colors.text },
    summaryTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 15,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    totalRow: { borderBottomWidth: 0 },
    label: { fontSize: 16, color: colors.textSecondary },
    value: {
      fontSize: 16,
      color: colors.text,
      fontWeight: "500",
      flex: 1,
      textAlign: "right",
    },
    totalLabel: { fontSize: 18, color: colors.text, fontWeight: "bold" },
    totalValue: { fontSize: 18, color: colors.primary, fontWeight: "bold" },
    payButton: {
      backgroundColor: colors.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
      marginTop: "auto",
      marginBottom: 20,
    },
    payButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: "bold",
    },
    disabledButton: { opacity: 0.7 },
  });

export default CheckoutScreen;
