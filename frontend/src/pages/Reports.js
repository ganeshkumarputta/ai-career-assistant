import React, {
  useEffect,
  useState
} from "react";

import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

import {
  auth,
  db
} from "../firebase";

import {
  FaChartBar,
  FaRobot,
  FaCalendarAlt
} from "react-icons/fa";

function Reports() {

  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchReports();

  }, []);

  const fetchReports = async () => {

    try {

      const user = auth.currentUser;

      if (!user) return;

      const q = query(

        collection(db, "reports"),

        where(
          "email",
          "==",
          user.email
        )
      );

      const querySnapshot =
        await getDocs(q);

      const reportsData = [];

      querySnapshot.forEach((doc) => {

        reportsData.push({

          id: doc.id,

          ...doc.data()
        });
      });

      setReports(reportsData);

      setLoading(false);

    } catch (error) {

      console.error(error);

      setLoading(false);
    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to right, #020617, #0f172a)",
        padding: "40px",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#38bdf8",
          fontSize: "45px"
        }}
      >
        📄 My Reports
      </h1>

      {loading ? (

        <h2
          style={{
            textAlign: "center"
          }}
        >
          Loading Reports...
        </h2>

      ) : reports.length === 0 ? (

        <h2
          style={{
            textAlign: "center"
          }}
        >
          No Reports Found
        </h2>

      ) : (

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "30px"
          }}
        >

          {reports.map((report) => (

            <div
              key={report.id}
              style={{
                background:
                  "rgba(255,255,255,0.05)",

                border:
                  "1px solid rgba(255,255,255,0.1)",

                borderRadius: "20px",

                padding: "25px",

                backdropFilter: "blur(12px)",

                boxShadow:
                  "0px 0px 20px rgba(0,0,0,0.3)"
              }}
            >

              <h2
                style={{
                  marginBottom: "20px",
                  color: "#38bdf8"
                }}
              >
                <FaChartBar />

                {" "}

                Resume Report
              </h2>

              <p
                style={{
                  marginBottom: "12px"
                }}
              >
                <strong>
                  ATS Score:
                </strong>

                {" "}

                {report.ats_score}%
              </p>

              <p
                style={{
                  marginBottom: "12px"
                }}
              >
                <strong>
                  JD Match:
                </strong>

                {" "}

                {report.match_score}%
              </p>

              <p
                style={{
                  marginBottom: "18px"
                }}
              >
                <FaCalendarAlt />

                {" "}

                {new Date(
                  report.created_at
                ).toLocaleString()}
              </p>

              <h3
                style={{
                  marginBottom: "12px"
                }}
              >
                <FaRobot />

                {" "}

                AI Feedback
              </h3>

              <div
                style={{
                  background:
                    "rgba(255,255,255,0.05)",

                  padding: "15px",

                  borderRadius: "12px",

                  lineHeight: "1.8",

                  maxHeight: "250px",

                  overflowY: "auto",

                  fontSize: "14px"
                }}
              >
                {report.ai_feedback}
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Reports;