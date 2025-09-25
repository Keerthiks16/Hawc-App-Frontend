import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  LiveKitRoom,
  VideoView,
  useRoom,
  useParticipant,
} from "livekit-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

const ParticipantView = ({ participant }) => {
  const { colors } = useTheme();
  const { cameraPublication, microphonePublication } =
    useParticipant(participant);
  const isVideoAvailable =
    cameraPublication &&
    cameraPublication.isSubscribed &&
    !cameraPublication.isMuted;

  return (
    <View style={styles.participantContainer}>
      {isVideoAvailable ? (
        <VideoView
          style={styles.videoView}
          track={cameraPublication.track}
          objectFit="contain"
        />
      ) : (
        <View
          style={[
            styles.videoView,
            {
              backgroundColor: colors.card,
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Ionicons name="person-circle" size={80} color={colors.border} />
        </View>
      )}
      {!microphonePublication || microphonePublication.isMuted ? (
        <View style={styles.muteIconContainer}>
          <Ionicons name="mic-off" size={16} color="white" />
        </View>
      ) : null}
      <Text style={styles.participantName}>{participant.identity}</Text>
    </View>
  );
};

const MeetingUI = () => {
  const { room, participants, localParticipant } = useRoom();
  const navigation = useNavigation();

  const { isCameraEnabled, isMicrophoneEnabled } =
    useParticipant(localParticipant);

  const onDisconnect = () => {
    room.disconnect();
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={participants}
        renderItem={({ item }) => <ParticipantView participant={item} />}
        keyExtractor={(item) => item.sid}
        numColumns={2}
        contentContainerStyle={styles.videoGrid}
      />
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={() =>
            localParticipant.setMicrophoneEnabled(!isMicrophoneEnabled)
          }
          style={styles.controlButton}
        >
          <Ionicons
            name={isMicrophoneEnabled ? "mic-outline" : "mic-off-outline"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => localParticipant.setCameraEnabled(!isCameraEnabled)}
          style={styles.controlButton}
        >
          <Ionicons
            name={isCameraEnabled ? "videocam-outline" : "videocam-off-outline"}
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDisconnect}
          style={[styles.controlButton, { backgroundColor: "#EF4444" }]}
        >
          <Ionicons name="call" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const LiveKitMeetingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { authToken } = route.params || {};

  // NOTE: I am using the URL you provided.
  const LIVEKIT_URL = "wss://conference-gxcqthti.livekit.cloud";

  if (!authToken) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: colors.text, fontSize: 16 }}>
          Error: Auth Token was not provided.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LiveKitRoom
        token={authToken}
        serverUrl={LIVEKIT_URL}
        audio={true}
        video={true}
        onDisconnected={() => navigation.goBack()}
      >
        <MeetingUI />
      </LiveKitRoom>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  videoGrid: { flex: 1 },
  participantContainer: {
    width: "50%",
    height: "50%",
    position: "relative",
    borderWidth: 1,
    borderColor: "#1a1a1a",
  },
  videoView: { width: "100%", height: "100%" },
  participantName: {
    position: "absolute",
    bottom: 8,
    left: 8,
    color: "white",
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
  },
  muteIconContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    padding: 4,
  },
  controlsContainer: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LiveKitMeetingScreen;
