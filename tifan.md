🔥 AGNI-NETRA

Intelligent Facial Access Control & Intrusion Alert System

""Python" (https://img.shields.io/badge/Python-3.x-blue?logo=python)" (https://www.python.org/)
""OpenCV" (https://img.shields.io/badge/OpenCV-Computer%20Vision-red?logo=opencv)" (https://opencv.org/)
""Raspberry Pi" (https://img.shields.io/badge/Raspberry%20Pi-4B-c51a4a?logo=raspberrypi)" (https://www.raspberrypi.com/)
""Flask" (https://img.shields.io/badge/Flask-Dashboard-black?logo=flask)" (https://flask.palletsprojects.com/)
""SQLite" (https://img.shields.io/badge/SQLite-Database-003b57?logo=sqlite)" (https://www.sqlite.org/)
""Status" (https://img.shields.io/badge/Status-Prototype-orange)"

«A low-cost security prototype combining PIR motion detection, webcam-based face verification, automated alerts, evidence capture, and tamper-evident event logging.»

Developed at SGGSIE&T, Nanded | Student Innovation Exhibition

---

📸 Project Preview

«Add your actual project photographs/screenshots here.»

Hardware Prototype| Face Verification| Security Dashboard
"Hardware" (docs/images/hardware.jpg)| "Face Recognition" (docs/images/face-recognition.jpg)| "Dashboard" (docs/images/dashboard.jpg)

---

🧠 How It Works

┌──────────────┐
│ PIR SENSOR   │
└──────┬───────┘
       │ Motion
       ▼
┌──────────────────┐
│ Raspberry Pi 4B  │
│ GPIO + Response  │
└────────┬─────────┘
         │ Ethernet
         ▼
┌────────────────────────┐
│        LAPTOP          │
│                        │
│ Webcam → OpenCV        │
│        → Face Verify   │
│        → Authorization │
└───────────┬────────────┘
            │
            ▼
     ┌───────────────┐
     │ Event Engine  │
     └───────┬───────┘
             │
      ┌──────┴──────┐
      ▼             ▼
   Response      Evidence
      │             │
      ▼             ▼
 Buzzer / LED    Screenshot
                    │
                    ▼
              SQLite + SHA-256
                    │
                    ▼
             Flask Dashboard

The Raspberry Pi handles physical sensing and response, while the laptop performs webcam processing, face verification, event logging, and dashboard functions. Direct Ethernet is used for reliable Pi-to-laptop communication during the exhibition.

---

🚨 Event Classification

AGNI-NETRA does not treat every motion event as an intrusion.

State| Meaning| Response
🟢 "AUTHORIZED"| Enrolled/authorized face verified| Silent / normal operation
🔴 "NO_MATCH"| Face detected but no authorized match| Strong alert + evidence
🟠 "FACE_NOT_USABLE"| Face cannot be reliably verified| Medium alert + verification flag
🔵 "SENSOR_EVENT"| Motion detected without usable visual result| Log event

Important: "FACE_NOT_USABLE" is a verification exception and is not automatically considered malicious activity.

---

✨ Key Features

- 📡 PIR-based motion detection
- 📷 Webcam-based visual capture
- 👤 Enrolled-face verification
- 🔐 Authorization decision layer
- 🚨 Differentiated alert responses
- 📸 Event screenshot capture
- 🗄️ SQLite event storage
- 🔗 SHA-256 hash-chained event logs
- 🌐 Flask monitoring dashboard
- 🔌 Raspberry Pi ↔ Laptop Ethernet communication
- 🧪 Controlled security and failure testing

---

🛠️ Technology Stack

Layer| Technology
Hardware| Raspberry Pi 4B
Motion sensing| PIR
Camera| Laptop / USB webcam
Programming| Python
Computer Vision| OpenCV
Face Verification| Face recognition pipeline
Communication| HTTP over Ethernet
Backend| Flask
Database| SQLite
Integrity| SHA-256 hash chaining
Hardware GPIO| gpiozero

---

🚀 Installation

1. Clone the Repository

git clone https://github.com/<your-username>/AGNI-NETRA.git
cd AGNI-NETRA

2. Create Virtual Environment

python -m venv venv

Windows

venv\Scripts\activate

Linux / Raspberry Pi

source venv/bin/activate

3. Install Dependencies

pip install -r requirements.txt

For the Raspberry Pi:

pip install gpiozero requests

The project roadmap uses Python, OpenCV, face recognition, Flask, SQLite and GPIO tooling as the core software stack.

---

📁 Project Structure

AGNI-NETRA/
│
├── raspberry_pi/
│   ├── pir_sensor.py
│   ├── gpio_controller.py
│   └── communication.py
│
├── vision/
│   ├── camera.py
│   ├── face_detection.py
│   ├── face_recognition.py
│   └── enrollment.py
│
├── backend/
│   ├── app.py
│   ├── database.py
│   └── hash_chain.py
│
├── dashboard/
│   ├── templates/
│   └── static/
│
├── captures/
├── database/
│   └── events.db
│
├── docs/
│   └── images/
│
├── requirements.txt
└── README.md

---

🔌 Hardware Configuration

Current BCM GPIO mapping:

Component| GPIO
Zone A PIR| GPIO 4
Zone B PIR| GPIO 5
Relay| GPIO 22
Buzzer| GPIO 23
Zone A LED| GPIO 17
Zone B LED| GPIO 27

«⚠️ Safety: Use the relay only with a safe low-voltage demonstration circuit. Do not connect the prototype relay to mains electricity.»

---

▶️ Running the System

Start Raspberry Pi Controller

python raspberry_pi/pir_sensor.py

The Pi monitors the PIR sensors and sends a zone event to the laptop when motion is detected.

Start Laptop Server

python backend/app.py

The laptop then:

Receive motion event
       ↓
Capture webcam frame
       ↓
Detect face
       ↓
Verify against enrolled identities
       ↓
Determine event state
       ↓
Save evidence
       ↓
Write event to database
       ↓
Return response to Pi

---

🎬 Exhibition Demo

1️⃣ Authorized Person

Walk into the monitored zone using an enrolled identity.

PIR
 ↓
Camera
 ↓
Face Match
 ↓
AUTHORIZED
 ↓
No unnecessary alarm
 ↓
Event logged

2️⃣ Unknown Person

Use a non-enrolled person.

PIR
 ↓
Camera
 ↓
Face detected
 ↓
NO_MATCH
 ↓
Buzzer + LED
 ↓
Screenshot saved
 ↓
Dashboard updated

3️⃣ Face Not Usable

Present an intentionally difficult/occluded face condition.

PIR
 ↓
Camera
 ↓
Verification unavailable
 ↓
FACE_NOT_USABLE
 ↓
Medium alert
 ↓
Event logged

4️⃣ Log Integrity Demonstration

Modify a historical event in the demonstration database.

Then select:

VERIFY LOG INTEGRITY

Expected result:

✓ Valid chain

for an unchanged database, and:

✗ Tampering detected

after an event is altered.

The hash-chain design is intended to provide tamper evidence, rather than claim that the underlying database cannot be modified.

---

🧪 Testing

The prototype is evaluated using scenarios such as:

- Authorized face under normal lighting
- Unknown face
- Different face angles
- Multiple faces
- Low-light / blurred conditions
- Camera failure
- Alert failure
- Modified event records

Important evaluation metrics include false accepts, false rejects, robustness, recovery behavior, and event/log integrity.

---

🔐 Privacy & Responsible Use

This project is an educational prototype.

For testing:

- Use only consented identities.
- Do not publish raw facial data.
- Protect enrollment data.
- Keep authorization separate from recognition output.
- Treat uncertain recognition as uncertainty, not proof of malicious intent.
- Do not use the prototype for unauthorized identification.

---

⚠️ Limitations

AGNI-NETRA is not production-grade surveillance infrastructure.

The current prototype has limitations including:

- Controlled test environment
- Limited enrollment dataset
- Camera and lighting dependency
- Possible false accepts/rejects
- No production-grade liveness detection
- Limited long-duration reliability testing
- Prototype-level physical security
- No independent security certification

Real-world deployment would require additional security, privacy, reliability, and compliance validation.

---

🔮 Future Scope

Planned directions include:

- Multi-zone deployment
- Liveness / anti-spoofing
- Stronger biometric-data protection
- Role-based access control
- Mobile notifications
- Rugged hardware
- Offline resilience
- Independent security auditing
- Privacy and compliance evaluation

---

👥 Team

SGGSIE&T, Nanded

- Jayant Solanki — Hardware / System Integration
- Sahil Thakre — Hardware / Electronics
- Tanay Awachat — Computer Vision / Software
- Atharav Pawar — Backend / Security / Documentation

---

📚 Documentation

For the complete implementation plan, architecture, wiring, testing strategy, and development roadmap, see the project documentation in the "docs/" directory.

---

📜 Disclaimer

AGNI-NETRA is a student engineering prototype developed for academic and exhibition purposes.

It should not be interpreted as a production-ready security system or as a guarantee of facial-recognition accuracy or security.

---

🔥 AGNI-NETRA

Detect → Verify → Classify → Respond → Record