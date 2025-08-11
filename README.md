# Super Player API

This is a Node.js-based REST API server that provides various endpoints for different game modules and services.

## Project Structure

```
├── api/
│   └── sendNotification.js
├── helpers/
│   ├── convertToPlainObject.js
│   └── currentDateInArmenia.js
├── Middlewares/
│   └── errorHandlingMiddleware.js
├── modules/
│   ├── blum/
│   ├── hamster_kombat/
│   ├── hamster_kombat_season_two/
│   ├── major/
│   ├── pocketFi/
│   └── psp/
├── index.js
├── router.js
└── firebase.config.js
```

## Technologies Used

- Node.js
- Express.js
- Firebase/Firebase Admin
- CORS
- Dotenv

## Available Endpoints

### Base Endpoint
- `GET /api/` - Server health check

### Hamster Kombat Season Two
- `GET /api/hamster_kombat_season_two/clime` - Claim coins
- `GET /api/hamster_kombat_season_two/byCard` - Card operations

### PSP (Play Station Portal)
- `GET /api/psp/clime` - Claim rewards

### Pocket FI
- `GET /api/pocket-fi/clime` - Claim rewards

### Major
- `GET /api/major/roulette` - Roulette game endpoint
- `GET /api/major/coins` - Coins management
- `GET /api/major/swipe_coin` - Swipe coin operation

### Blum
- `GET /api/blum/climeAndFarm` - Claim and farm operations

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with required environment variables
4. Configure Firebase by updating `firebase.config.js`

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on port 5000 by default or the port specified in the environment variables.

## Project Modules

Each module in the `modules` directory follows a similar structure:
- `controllers/` - Request handlers
- `helpers/` - Utility functions
- `models/` - Data models
- `services/` - Business logic

## Error Handling

The application includes a global error handling middleware that processes all errors throughout the application.

## Dependencies

- express: ^4.21.0
- cors: ^2.8.5
- dotenv: ^16.4.5
- firebase: ^10.12.2
- firebase-admin: ^12.1.1
- nodemon: ^3.1.3 (development dependency)

## License

ISC