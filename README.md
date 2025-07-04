# DroneSpeak Platform

## AI-Powered Autonomous Drone Mission Planning

Transform any drone into an autonomous mission specialist with natural language commands. No waypoint programming, no complex interfaces – just plain English.

## תכונות

- 🔐 אימות משתמשים עם JWT
- 🚁 ניהול רחפנים מלא (CRUD)
- 📊 מעקב אחר טיסות וסטטיסטיקות
- 📧 מערכת הודעות ואימיילים
- 🗺️ אינטגרציה עם מפות
- 🔒 אבטחה מתקדמת עם rate limiting
- 📱 ממשק רספונסיבי

## דרישות מערכת

- Node.js 16.0 ומעלה
- MongoDB 5.0 ומעלה
- npm או yarn

## התקנה

### 1. שכפול הפרויקט

```bash
git clone <repository-url>
cd drone
```

### 2. התקנת חבילות

```bash
npm install
```

### 3. הגדרת משתני סביבה

```bash
cp .env.example .env
```

ערוך את הקובץ `.env` והזן את הערכים הנדרשים:

```env
# Database
DB_URL=mongodb://localhost:27017/drone_db

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Email
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Server
PORT=3000
NODE_ENV=development
```

### 4. הגדרת בסיס הנתונים

ודא שMongoDB פועל על המערכת שלך:

```bash
# על macOS עם Homebrew
brew services start mongodb/brew/mongodb-community

# על Linux
sudo systemctl start mongod

# על Windows
net start MongoDB
```

### 5. הפעלת השרת

```bash
# פיתוח
npm run dev

# הפעלה רגילה
npm start
```

השרת יפעל על `http://localhost:3000`

## שימוש

### API Endpoints

#### Authentication
- `POST /api/auth/register` - רישום משתמש חדש
- `POST /api/auth/login` - התחברות
- `POST /api/auth/logout` - התנתקות
- `POST /api/auth/forgot-password` - שחזור סיסמה

#### Drones
- `GET /api/drones` - קבלת כל הרחפנים
- `POST /api/drones` - יצירת רחפן חדש
- `GET /api/drones/:id` - קבלת רחפן ספציפי
- `PUT /api/drones/:id` - עדכון רחפן
- `DELETE /api/drones/:id` - מחיקת רחפן

#### Flights
- `GET /api/flights` - קבלת כל הטיסות
- `POST /api/flights` - יצירת טיסה חדשה
- `GET /api/flights/:id` - קבלת טיסה ספציפית
- `PUT /api/flights/:id` - עדכון טיסה
- `DELETE /api/flights/:id` - מחיקת טיסה

### דוגמאות שימוש

#### רישום משתמש
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### יצירת רחפן חדש
```bash
curl -X POST http://localhost:3000/api/drones \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "DJI Mavic Pro",
    "model": "Mavic Pro",
    "serialNumber": "MP001234",
    "batteryLevel": 100
  }'
```

## מבנה הפרויקט

```
drone/
├── config/
│   └── database.js          # הגדרות בסיס נתונים
├── controllers/
│   ├── authController.js    # בקרת אימות
│   ├── droneController.js   # בקרת רחפנים
│   └── flightController.js  # בקרת טיסות
├── middleware/
│   ├── auth.js             # אימות JWT
│   ├── errorHandler.js     # טיפול בשגיאות
│   ├── rateLimiter.js      # הגבלת קצב
│   └── validation.js       # בדיקות תקינות
├── models/
│   ├── User.js             # מודל משתמש
│   ├── Drone.js            # מודל רחפן
│   └── Flight.js           # מודל טיסה
├── routes/
│   ├── auth.js             # נתיבי אימות
│   ├── drones.js           # נתיבי רחפנים
│   └── flights.js          # נתיבי טיסות
├── services/
│   ├── emailService.js     # שירות אימייל
│   └── jwtService.js       # שירות JWT
├── utils/
│   ├── logger.js           # מערכת לוגים
│   └── helpers.js          # פונקציות עזר
├── views/
│   ├── index.html          # דף בית
│   ├── login.html          # דף התחברות
│   ├── register.html       # דף רישום
│   └── dashboard.html      # דף ניהול
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── .env.example            # דוגמה למשתני סביבה
├── .gitignore
├── package.json
├── server.js               # נקודת כניסה
└── README.md
```

## בדיקות

```bash
# הרצת בדיקות
npm test

# בדיקות עם coverage
npm run test:coverage
```

## פיתוח

### הוספת תכונות חדשות
1. צור branch חדש: `git checkout -b feature/new-feature`
2. בצע שינויים
3. הוסף בדיקות
4. הרץ בדיקות: `npm test`
5. בצע commit: `git commit -m "Add new feature"`
6. דחף ל-GitHub: `git push origin feature/new-feature`

### הנחיות קוד
- השתמש ב-ESLint לבדיקת איכות הקוד
- כתב בדיקות לכל תכונה חדשה
- עקוב אחר מבנה הפרויקט הקיים
- השתמש בהערות בעברית לתיעוד

## הגדרת סביבת ייצור

### 1. משתני סביבה
```env
NODE_ENV=production
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/drone_db
JWT_SECRET=very_strong_secret_key
CORS_ORIGIN=https://yourdomain.com
```

### 2. הרצה עם PM2
```bash
npm install -g pm2
pm2 start server.js --name "drone-app"
pm2 startup
pm2 save
```

### 3. Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## פתרון בעיות

### בעיות נפוצות

1. **שגיאת חיבור למסד נתונים**
   - ודא שMongoDB פועל
   - בדוק את ה-DB_URL ב-.env

2. **בעיות אימות**
   - ודא שה-JWT_SECRET מוגדר
   - בדוק שהטוקן נשלח בheader

3. **בעיות CORS**
   - ודא שה-CORS_ORIGIN מוגדר נכון
   - בדוק שהדומיין מותר

## תמיכה

- 📧 Email: support@example.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-repo/issues)
- 📖 Documentation: [Wiki](https://github.com/your-repo/wiki)

## רישיון

MIT License - ראה קובץ LICENSE לפרטים מלאים.