🔥 AGNI-NETRA

Intelligent Facial Access Control & Intrusion Alert System

AGNI-NETRA is a low-cost, intelligent physical security prototype designed to monitor restricted zones using motion detection, facial verification, event classification, automated alerts, and tamper-evident logging.

The system combines a Raspberry Pi 4B, PIR motion sensing, a webcam, computer vision, automated response mechanisms, and a password-protected monitoring dashboard.

«Project Type: College Exhibition / Engineering Prototype
Institution: SGGSIE&T, Nanded
Domain: Computer Vision · IoT · Physical Security · Edge Computing
Prototype Scope: Single-zone / expandable multi-zone system»

---

📌 Problem Statement

Traditional motion-based security systems generally respond to every detected movement in the same way.

This creates several problems:

- Lack of context: Authorized personnel and unknown people may trigger identical alarms.
- Verification difficulty: A motion sensor cannot determine who entered a restricted area.
- Delayed response: Depending entirely on manual monitoring can introduce response delays.
- Poor evidence preservation: Basic alarm systems often lack structured event records and visual evidence.
- Limited auditability: Conventional logs can be modified without an obvious indication of tampering.

AGNI-NETRA addresses these limitations by combining physical sensing with visual verification and structured event logging.

---

🎯 System Goal

The main objective is:

Motion Detection
       ↓
Event Identification
       ↓
Authorization Decision
       ↓
Appropriate Alert
       ↓
Evidence Preservation
       ↓
Tamper-Evident Event Log

Instead of treating every motion event as an intrusion, AGNI-NETRA attempts to determine the appropriate security response based on the available visual information.

---

🏗️ System Architecture

                    RESTRICTED ZONE
                         │
                         ▼
                  ┌─────────────┐
                  │ PIR Sensor  │
                  └──────┬──────┘
                         │
                         ▼
                 ┌───────────────┐
                 │ Raspberry Pi  │
                 │     4B        │
                 │               │
                 │ GPIO / Logic  │
                 │ Buzzer / LED  │
                 │ Relay         │
                 └───────┬───────┘
                         │
                    Ethernet
                         │
                         ▼
                ┌─────────────────┐
                │     Laptop      │
                │                 │
                │ Webcam          │
                │ OpenCV          │
                │ Face Recognition│
                │ Decision Engine │
                │ SQLite          │
                │ SHA-256         │
                │ Flask Dashboard │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Security Admin  │
                │    Dashboard    │
                └─────────────────┘

The prototype uses the Raspberry Pi for physical sensing and response while the laptop handles webcam-based computer vision, logging, and dashboard functionality. Direct Ethernet is used for reliable communication during the exhibition.

---

⚙️ Core Components

Component| Purpose
Raspberry Pi 4B| Hardware control and system coordination
PIR Motion Sensor| Detects physical movement
Webcam| Captures visual information
OpenCV| Image/video processing
Face Recognition| Verifies enrolled identities
Buzzer| Audible security alert
LEDs| Visual system/alert indication
Relay| Demonstrates physical access-control response
SQLite| Local event database
SHA-256| Tamper-evident hash chaining
Flask| Web dashboard
Ethernet| Pi ↔ laptop communication

The technology stack is based on affordable, well-documented components rather than specialized enterprise hardware.

---

🔄 System Workflow

1. Face Enrollment

Authorized users are enrolled using consented test images.

User Image
    ↓
Face Detection
    ↓
Face Encoding
    ↓
Authorized Face Database

The prototype uses only consented identities for testing.

---

2. Motion Detection

The PIR sensor monitors the restricted area.

When movement is detected:

PIR
 ↓
Raspberry Pi
 ↓
Zone Event
 ↓
Camera Activation / Request

---

3. Image Capture

The webcam captures the person entering the monitored area.

For the current prototype, a standard laptop webcam can be used instead of a dedicated Raspberry Pi camera module.

---

4. Face Verification

The captured image is processed using computer vision.

Captured Frame
      ↓
Face Detection
      ↓
Face Encoding
      ↓
Comparison with Enrolled Faces
      ↓
Identity Decision

Detection and recognition are treated as separate stages so that an unknown or unusable face is not automatically treated as a verified identity.

---

🚨 Event Classification

AGNI-NETRA uses differentiated responses rather than one alarm for every event.

🟢 AUTHORIZED

A recognized and authorized person is detected.

Face Match
    ↓
Authorization Confirmed
    ↓
Silent / Normal Operation
    ↓
Event Logged

No unnecessary audible alarm is generated.

---

🔴 NO MATCH

A usable face is detected but does not match an enrolled authorized identity.

Face Detected
    ↓
No Authorized Match
    ↓
NO MATCH
    ↓
Strong Alert
    ↓
Screenshot + Event Log

The dashboard receives the event information.

---

🟠 FACE NOT USABLE

The system cannot reliably use the captured face for verification because of conditions such as occlusion or insufficient visual information.

Motion
  ↓
Camera
  ↓
Face Verification Not Possible
  ↓
FACE NOT USABLE
  ↓
Medium Alert
  ↓
Manual Verification Flag

Important: A face that cannot be verified is not automatically classified as malicious. It is treated as a verification exception.

---

🔵 SENSOR EVENT

Motion is detected but there is insufficient usable visual information to make a person-level classification.

PIR Trigger
    ↓
No Reliable Person/Face Result
    ↓
SENSOR EVENT
    ↓
Event Logged

---

📊 Dashboard

The Flask dashboard provides a centralized interface for monitoring system events.

Dashboard functions

- Password-protected administrator access
- Current system status
- Zone identification
- Event timestamps
- Authorized/unauthorized status
- Screenshot review
- Event history
- Alert status
- Log-integrity verification

Example:

┌─────────────────────────────────────────────┐
│              AGNI-NETRA                     │
│         SECURITY MONITORING DASHBOARD       │
├─────────────────────────────────────────────┤
│ SYSTEM STATUS: ONLINE                       │
│                                             │
│ ZONE A: ACTIVE                              │
│                                             │
│ Recent Events                               │
│                                             │
│ 10:32:15 | ZONE A | AUTHORIZED              │
│ 10:35:42 | ZONE A | NO MATCH                │
│ 10:38:07 | ZONE A | FACE NOT USABLE         │
│                                             │
│ [ VERIFY LOG INTEGRITY ]                    │
└─────────────────────────────────────────────┘

---

🔐 Tamper-Evident Logging

Every event is stored in a local database.

Each event is cryptographically linked to the previous event using SHA-256 hashing.

Conceptually:

Event 1
   ↓
Hash 1
   ↓
Event 2 + Hash 1
   ↓
Hash 2
   ↓
Event 3 + Hash 2
   ↓
Hash 3

If a historical event is modified, the hash chain no longer matches.

Normal:

Event → Hash → Event → Hash → Event → Hash
                     ✓

After modification:

Event → Hash → MODIFIED EVENT → Hash
                     ✗
                TAMPERING DETECTED

The purpose is tamper evidence, not a claim that the database is impossible to alter.

---

🗄️ Event Data

A typical event record contains:

event_id
timestamp
zone
status
identity
image_path
previous_hash
current_hash

Example:

ID:              102
Timestamp:       2026-09-07 18:42:11
Zone:            Zone A
Status:          NO_MATCH
Identity:        UNKNOWN
Image:           captures/102.jpg
Previous Hash:   91a8...
Current Hash:    f83c...

---

🔌 Raspberry Pi GPIO Configuration

The current planned GPIO configuration is:

Device| GPIO| Purpose
Zone A PIR| GPIO 4| Motion detection
Zone B PIR| GPIO 5| Motion detection
Relay| GPIO 22| Physical response
Buzzer| GPIO 23| Audible alert
Zone A LED| GPIO 17| Zone status
Zone B LED| GPIO 27| Zone status

«GPIO numbering uses BCM numbering.»

For the exhibition prototype, relay testing should use a safe low-voltage demonstration circuit, not mains electricity.

---

💻 Software Stack

Python
│
├── OpenCV
│   └── Camera + image processing
│
├── Face Recognition
│   └── Face verification
│
├── Flask
│   └── Web dashboard
│
├── SQLite
│   └── Event storage
│
├── hashlib / SHA-256
│   └── Log integrity
│
└── gpiozero
    └── Raspberry Pi GPIO control

---

🌐 Communication

The Raspberry Pi and laptop communicate over a direct wired Ethernet connection.

PIR detects movement
        ↓
Raspberry Pi
        ↓
HTTP request
        ↓
Flask server on laptop
        ↓
Webcam capture
        ↓
Face verification
        ↓
Classification result
        ↓
Response sent back
        ↓
Pi activates appropriate response

Direct Ethernet is preferred for the exhibition because it reduces dependence on unreliable Wi-Fi conditions.

---

🧪 Testing

The prototype should be evaluated under controlled conditions.

Test| Expected Result
Authorized person| Authorized, no unnecessary alarm
Unknown person| NO MATCH + strong alert
Face partially/fully unusable| FACE NOT USABLE
Motion without usable face| SENSOR EVENT
Different lighting| System continues or safely rejects
Different face angle| Recognition or safe rejection
Multiple faces| Each face handled appropriately
Camera disconnected| Error/health state
Alert unavailable| Event remains locally logged
Modified historical event| Hash verification fails

The broader project roadmap specifically recommends measuring false accepts, false rejects, robustness, camera failures, and alert-service failures.

---

📈 Current Prototype Status

Implemented / Target Exhibition Features

- [x] Raspberry Pi 4B based hardware
- [x] PIR motion detection
- [x] Webcam-based visual capture
- [x] Face verification
- [x] Authorization decision
- [x] Differentiated event responses
- [x] Audible/visual alerts
- [x] Screenshot evidence
- [x] SQLite event logging
- [x] SHA-256 hash-chain logging
- [x] Password-protected Flask dashboard
- [x] Single-zone prototype

---

⚠️ Limitations

AGNI-NETRA is currently a student-level proof-of-concept, not a production-ready security product.

Current limitations include:

- Small enrolled-face dataset
- Controlled testing environment
- Dependence on camera quality and lighting
- Potential false accepts and false rejects
- No production-grade anti-spoofing/liveness detection
- Limited long-duration reliability testing
- Prototype-level physical security
- No independent security audit
- No claim of guaranteed recognition accuracy

Production deployment would require significantly more testing, hardening, privacy/compliance work, and independent security validation. The project documentation explicitly positions the current system as a prototype rather than a deployment-ready product.

---

🚀 Future Scope

Future versions can include:

1. Multi-Zone Expansion

Zone A → Zone B → Zone C → Zone D

allowing larger restricted facilities to be monitored.

2. Liveness Detection

Protection against:

- Printed photographs
- Phone-screen replay
- Video replay
- Other presentation attacks

3. Privacy-Preserving Biometrics

Future versions can investigate stronger protection of biometric information and minimize unnecessary storage of raw facial images.

4. Role-Based Access Control

Different administrators could receive different permissions:

Super Admin
    ↓
Security Admin
    ↓
Monitoring Operator

5. Mobile Notifications

Alerts could eventually be forwarded to authorized security personnel.

6. Hardware Hardening

Future product versions could include:

- Custom PCB
- Rugged enclosure
- Tamper switches
- Backup power
- Offline resilience

7. Security & Compliance

Before real-world deployment, the system would require appropriate security audits, reliability testing, biometric-data protection measures, and applicable regulatory/compliance review.

The broader commercialization roadmap follows the progression from proof-of-concept → anti-spoofing → independent security audit → large-scale reliability testing → compliance → specialized certification where required.

---

🗺️ Development Roadmap

                AGNI-NETRA
                    │
                    ▼
           Working Prototype
                    │
                    ▼
          Technical Validation
                    │
                    ▼
        Anti-Spoofing / Liveness
                    │
                    ▼
         Independent Security Audit
                    │
                    ▼
          Reliability Testing
                    │
                    ▼
       Privacy & Compliance Review
                    │
                    ▼
            Controlled Pilot
                    │
                    ▼
             Productization

---

👥 Team

SGGSIE&T, Nanded

Member| Role
Jayant Solanki| Hardware / System Integration
Sahil Thakre| Hardware / Electronics
Tanay Awachat| Computer Vision / Software
Atharav Pawar| Backend / Security / Documentation

All team members should understand the complete system architecture and not only their individual subsystem.

---

🎓 Project Objectives

Through AGNI-NETRA, the team aims to demonstrate practical understanding of:

- Raspberry Pi and GPIO
- IoT-style sensor integration
- Computer vision
- Face detection and verification
- Python programming
- Client-server communication
- Database management
- Cryptographic hashing
- Web application development
- Physical security concepts
- System integration
- Testing and failure analysis

---

📁 Suggested Repository Structure

AGNI-NETRA/
│
├── README.md
│
├── raspberry_pi/
│   ├── pir_sensor.py
│   ├── gpio_controller.py
│   └── requirements.txt
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
│   ├── logger.py
│   └── hash_chain.py
│
├── dashboard/
│   ├── templates/
│   └── static/
│
├── captures/
│
├── database/
│   └── events.db
│
├── docs/
│   ├── architecture/
│   ├── wiring/
│   └── testing/
│
└── requirements.txt

---

🔒 Privacy & Responsible Use

AGNI-NETRA is intended for controlled educational demonstration and authorized security research.

For the prototype:

- Use only consented test identities.
- Do not use the system for unauthorized identification.
- Do not publish raw facial data.
- Protect enrollment and administrator functions.
- Clearly document recognition limitations.
- Do not treat uncertain recognition as proof of malicious intent.
- Do not represent the prototype as production-grade surveillance technology.

---

📜 Project Disclaimer

AGNI-NETRA is a student engineering prototype developed for academic and exhibition purposes.

Performance figures, security properties, cost estimates, and reliability claims should be interpreted within the controlled prototype environment. Real-world deployment would require additional engineering, testing, security auditing, privacy safeguards, and applicable certification.

---

⭐ Conclusion

AGNI-NETRA demonstrates how inexpensive hardware and open-source software can be combined to create a layered physical-security prototype.

Rather than relying solely on motion detection, the system combines:

PIR Motion Detection
        +
Computer Vision
        +
Face Verification
        +
Authorization Logic
        +
Tiered Response
        +
Visual Evidence
        +
Tamper-Evident Logging
        +
Monitoring Dashboard

The project demonstrates a practical transition from a basic motion alarm to an explainable, event-driven security architecture while maintaining a realistic distinction between a student prototype and a production security system.

---

🔥 AGNI-NETRA

Intelligent Facial Access Control & Intrusion Alert System

SGGSIE&T, Nanded

«Detect → Verify → Classify → Respond → Record»