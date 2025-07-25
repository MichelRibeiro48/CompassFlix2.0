import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000'
    },
    banner: {
        width: '100%',
        height: '40%'
    },
    title: { fontWeight: 700, fontSize: 24, color: '#fff', marginTop: 24 },
    subtitle: { fontWeight: 400, fontSize: 14, color: '#fff', marginTop: 4 },
    form: { gap: 18, marginTop: 24 },
    error: { color: "red", marginTop: -12 },
    button: { marginTop: 24, padding: 12, paddingHorizontal: 24, backgroundColor: '#E9A6A6', borderRadius: 12 },
    buttonText: { color: "#fff", fontWeight: "bold" },
})