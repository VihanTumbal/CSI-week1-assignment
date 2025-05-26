# React Registration Form

A comprehensive registration form built with React, showcasing form validation, dynamic UI updates, and responsive design.

## 🚀 Features

### Form Fields

- **Personal Information**
  - First Name & Last Name
  - Username
  - Email
  - Password (with show/hide toggle)
  - Phone Number (with country code selection)
  - Country & City (dynamic dropdowns)
  - PAN & Aadhar Numbers (Indian identification)

### Validation

- ✨ Real-time field validation
- 📝 Format requirements:
  ```text
  Email: valid email format
  Phone: 10 digits
  PAN: 5 letters + 4 digits + 1 letter (e.g., ABCDE1234F)
  Aadhar: 12 digits
  Password: 6+ chars, 1 uppercase, 1 lowercase, 1 digit
  ```

### User Experience

- 🔄 Dynamic city selection based on country
- 👁️ Password visibility toggle
- ⚡ Instant validation feedback
- 🔒 Submit button enables only when form is valid
- ✅ Success page with submission summary

## 🛠️ Built With

- [React](https://reactjs.org/) - Frontend framework
- [React Router](https://reactrouter.com/) - Navigation
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📦 Installation

1. Clone the repository

```sh
git clone <repository-url>
cd week-1
```

2. Install dependencies

```sh
npm install
# or
yarn install
```

3. Start development server

```sh
npm run dev
# or
yarn dev
```

The application will open in your browser at `http://localhost:5173`

## 🎯 Usage

1. Access the application in your browser
2. Fill out the registration form
3. Observe real-time validation:
   - Fields highlight errors as you type
   - Error messages appear below invalid fields
4. Submit when all fields are valid
5. View submission summary on success page
