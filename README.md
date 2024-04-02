# notifications-bot 🤖

This is a Telegram bot that scrapes a website for specific items and sends a message to a specified chat when it finds matching items.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Typescript
- yarn

### Installing

1. Clone the repository:
    ```
    git clone https://github.com/namiranda/notifications-bot.git
    ```

2. Install the dependencies:
    ```
    cd notifications-bot
    yarn install
    ```

3. Create a `.env` file in the root directory of the project, and add your bot token and chat ID:
    ```
    TOKEN=your_bot_token
    CHAT_ID=your_chat_id
    ```

4. Start the bot:
    ```
    yarn start
    ```

## Deployment

This bot can be deployed on any platform that supports Node.js, such as Heroku, AWS Elastic Beanstalk, or Vercel.

## Built With

- [Node.js](https://nodejs.org/)
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - Telegram Bot API for NodeJS
- [Puppeteer](https://github.com/puppeteer/puppeteer) - Headless Chrome Node.js API
