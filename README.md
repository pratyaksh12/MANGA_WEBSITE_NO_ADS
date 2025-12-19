# Manga Reader

A clean, ad-free manga reading application built with Next.js and .NET.

## Overview

This project is a personal manga library and reader that aggregates content from MangaDex. It features a modern, responsive UI designed for a seamless reading experience without distractions.

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Styled Components
- **Animations**: GSAP
- **State Management**: React Context (MangaContext)

### Backend
- **Framework**: .NET 9 Web API
- **Language**: C#
- **Integration**: HttpClient with MangaDex API
- **Documentation**: Swagger/OpenAPI

## Features

- **Browse & Search**: View popular manga and search for specific titles, authors, or tags.
- **Immersive Reader**: Vertical scroll reader with seamless page loading and an orbit loading indicator.
- **Smart Navigation**: Context-aware back buttons and easy chapter switching (Next/Previous).
- **Chapter Lists**: Sticky, scrollable chapter lists on the details page.
- **Responsive Design**: Optimized for both desktop and mobile reading.

## Getting Started

### Prerequisites
- Node.js (v18+)
- .NET 9 SDK

### Backend Setup
1. Navigate to the Backend directory.
   ```bash
   cd Backend
   ```
2. Restore dependencies.
   ```bash
   dotnet restore
   ```
3. Run the server.
   ```bash
   dotnet run
   ```
   The API will start at `http://localhost:5085`.

### Frontend Setup
1. Navigate to the frontend directory.
   ```bash
   cd frontend
   ```
2. Install dependencies.
   ```bash
   npm install
   ```
3. Start the development server.
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`.

## API Reference

The backend acts as a proxy to the MangaDex API to handle CORS and data transformation.
- `GET /api/manga/popular`: Fetch popular titles.
- `GET /api/manga/{id}`: Get manga details.
- `GET /api/manga/{id}/chapters`: Get chapter list.
- `GET /api/manga/chapter/{chapterId}`: Get pages for a specific chapter.
- `GET /api/manga/search/{query}`: Search for manga.

## Project Structure

- `frontend/`: Next.js application source code.
  - `src/app/`: App router pages (Home, Manga, Read, Search).
  - `src/components/`: Reusable UI components.
  - `src/lib/`: API clients and types.
- `Backend/`: .NET Web API source code.
  - `Controllers/`: API endpoints.
  - `Services/`: External API integration logic.