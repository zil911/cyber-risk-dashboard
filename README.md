# Cybersecurity Risk Management Dashboard

A prototype Arabic RTL GRC dashboard for managing cybersecurity risks and project assessments.

## Project Idea

This project simulates cybersecurity risk management activities within a GRC environment. It allows users to register risks, assess likelihood and CIA impact, calculate risk scores, classify risk levels, and monitor risks through a dashboard.

## Features

- Add cybersecurity risks
- Calculate risk score using likelihood and highest CIA impact
- Classify risks as Low, Medium, High, or Critical
- Add project risk assessments
- Generate suggested security requirements
- Dashboard for monitoring, editing, deleting, and viewing details
- Arabic RTL interface
- Data persistence using localStorage

## Technologies Used

- React.js
- Vite
- JavaScript
- HTML
- CSS
- localStorage
- GitHub
- Vercel

## Risk Calculation

Selected Impact = highest value of Confidentiality, Integrity, and Availability.

Risk Score = Likelihood × Selected Impact

Risk Levels:

- 1–5: Low
- 6–10: Medium
- 11–15: High
- 16–25: Critical

## Project Status

This project is a prototype for learning and demonstration purposes. It is not a production-ready system.

## Future Improvements

- Add real database
- Add authentication
- Add user roles
- Add audit logs
- Add backend API
- Improve security controls
