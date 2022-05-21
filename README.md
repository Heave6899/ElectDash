# ElectDash 
The application is set to autodeploy on web, the backend is written in dotnetcore3.1, C# and frontend is written in Angular. The database used is MongoDB and it used role-based authentication. The project is still under development, frontend staging app can be accessed at [Heroku](https://electdash-staging.herokuapp.com/).

## Use Cases
- This web app can be used to connect to IoT devices and be used as a monitoring application for heavy machinery in the industry. It used private MQTT servers using Raspberry Pi as the master node and ESP8266 as the slave nodes. Everything can be set up on private or pubilc MQTT channels depending upon data sensitivity.

## Frontend 
### Features RoadMap
- [x] Login Authentication for all routes
- [x] TOTP Based 2FA Login Option
- [ ] Password Reset
- [x] Dashboard Graphs Hide/Show
- [x] Dashboard visual customization and storage in localDB
- [x] Rearrange dashboard graphs based on preference
- [ ] Update Chartist.js function to improve real-time graph visualization performance
- [ ] Allow option to add more graphs based on selective parameters
- [ ] Optimize background service worker to handle incoming MQTT responses from server and IoT devices
- [ ] Allow setting alarms for graphs 

## Backend
### Features RoadMap
- [ ] Add additional graph data features including custom user-defined graphs.
- [x] Login route
- [x] CORS and header correction with jwt token present in every token
- [x] Token expiration and login assignment to the user.
- [x] Secure api routing
- [ ] Add routes for accessing configuration for the web app for the logged in user based on token.
- [x] Connect to MQTT channel for pub-sub connection
- [x] Connect to MongoDB using URI and secure credentials

### Branches
- [Backend MQTT Enabled](https://github.com/Heave6899/ElectDash/tree/backend-feature-mqtt)
- [Frontend MQTT Enabled](https://github.com/Heave6899/ElectDash/tree/frontend-mqtt)
- [Backend Master](https://github.com/Heave6899/ElectDash/tree/backend-master)
- [Backend Master](https://github.com/Heave6899/ElectDash/tree/frontend-master)
