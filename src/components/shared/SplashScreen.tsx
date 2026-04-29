export default function SplashScreen() {
  return (
    <main
      data-testid="splash-screen"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        background:
          "linear-gradient(135deg,#eff6ff,#dbeafe)",
      }}
    >
      <section
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "34px",
            fontWeight: "800",
            color: "#111827",
            letterSpacing: "-0.5px",
          }}
        >
          Habit Tracker
        </h1>

        <p
          style={{
            margin:
              "10px 0 20px",
            color: "#6b7280",
            fontSize: "15px",
          }}
        >
          Build better habits,
          every day
        </p>

        <div
          style={{
            width: "42px",
            height: "42px",
            margin: "0 auto",
            borderRadius: "999px",
            border:
              "4px solid #bfdbfe",
            borderTop:
              "4px solid #2563eb",
          }}
        />
      </section>
    </main>
  );
}