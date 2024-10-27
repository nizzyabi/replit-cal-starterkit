# Cal.com Barbershop Example App for Replit

<div align="center">
  <img src="https://github.com/calcom/platform-starter-kit/assets/8019099/6f0a8337-6d18-42de-aa00-44a57764e19b" alt="Cal.com Barbershop Logo">

  Build your own booking system for a barbershop using Cal.com's platform!
  
  [View Demo](https://experts.cal.com) · 
  [Watch Tutorial](https://www.youtube.com/watch?v=wwo07ghiNn4) · 
  [Read Docs](https://cal.com/docs/platform)
</div>

## 🚀 Quick Start

1. **Fork this Repl** to get your own copy
2. **Set up your database:**
   - Create a free Supabase project at [database.new](https://database.new)
   - Copy your database URLs from the [Supabase dashboard](https://supabase.com/dashboard/project/_/settings/database)
   - Create an `avatars` bucket in Supabase for profile pictures

3. **Set up your environment:**
   - Click on the 🔒 Secrets (Environment Variables) tab in your Repl
   - Copy the contents of `.env.example` into your Secrets
   - Update the database URLs with your Supabase credentials:
     ```
     POSTGRES_PRISMA_URL=your_connection_string_here
     POSTGRES_URL_NON_POOLING=your_connection_string_here
     ```

4. **Initialize your database:**
   - Open the Shell in Replit
   - Run these commands:
     ```bash
     pnpm db:init
     pnpm db:seed
     ```

5. **Generate an auth secret:**
   - In the Shell, run: `openssl rand -hex 32`
   - Add the output to your Secrets as `AUTH_SECRET`

6. **Start coding!**
   - Click the Run button ▶️
   - Your app should now be live!

## 📱 Features

- Full booking system for a barbershop
- User authentication
- Profile management
- Appointment scheduling
- Built with modern tech:
  - Next.js
  - Cal.com Platform
  - Supabase
  - Prisma
  - TailwindCSS

## 🔧 Development Tips

- The app uses Cal.com's sandbox keys by default for development
- For production, update `NEXT_PUBLIC_REFRESH_URL` to point to your deployed app
- Use the Shell in Replit to run commands like:
  ```bash
  # Install a new package
  pnpm add package-name

  # Run database migrations
  pnpm db:push
  ```

## 🆘 Need Help?

- Ask us on [Twitter](https://x.com/calcom)
- Check out the [Cal.com Platform docs](https://cal.com/docs)
- Visit the [Replit docs](https://docs.replit.com)
- Ask questions in the [Replit community](https://replit.com/community)

## 🔒 Security Note

After setting up your database, make sure to secure your `_prisma_migrations` table:
1. Go to your [Supabase Table Editor](https://supabase.com/dashboard/project/_/editor)
2. Find the `_prisma_migrations` table
3. Click "RLS disabled" and enable Row Level Security

## ⭐ What's Next?

1. Customize the UI to match your brand
2. Add more features like:
   - SMS notifications
   - Payment processing
   - Custom booking rules
3. Deploy your app to production
4. Purchase a commercial API key from [Cal.com/sales](https://cal.com/sales) when ready

Remember to check out the [video tutorial](https://www.youtube.com/watch?v=wwo07ghiNn4) for a detailed walkthrough!