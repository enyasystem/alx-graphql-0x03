# Rick and Morty GraphQL Application - alx-rick-and-morty-app

## Project Overview

This is a modern React/Next.js application that demonstrates GraphQL integration with the Rick and Morty API. The project uses Apollo Client for state management and query execution, TypeScript for type safety, and Tailwind CSS for styling.

## Task 3: Application of GraphQL in React

### Objectives Completed
✅ Set up a Next.js project with TypeScript, ESLint, and Tailwind CSS
✅ Configured Apollo Client to connect to the Rick and Morty GraphQL API
✅ Created GraphQL query definitions
✅ Integrated ApolloProvider into the application

## Technologies Used

### Core Framework
- **Next.js** - React framework with built-in routing and SSR capabilities
- **React** - UI library for building components
- **TypeScript** - Static typing for JavaScript

### GraphQL & State Management
- **Apollo Client** - Comprehensive state management library for GraphQL
- **GraphQL** - Query language for APIs

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Development Tools
- **ESLint** - Code quality and consistency checking
- **Node.js** - JavaScript runtime environment

## Project Structure

```
alx-rick-and-morty-app/
├── graphql/                 # GraphQL configuration and queries
│   ├── apolloClient.ts     # Apollo Client configuration
│   └── queries.ts          # GraphQL query definitions
├── pages/
│   ├── _app.tsx            # Application entry point with ApolloProvider
│   ├── _document.tsx       # Document wrapper
│   └── index.tsx           # Home page
├── styles/
│   ├── globals.css         # Global styles
│   └── Home.module.css     # Component-specific styles
├── public/                 # Static assets
├── package.json            # Project dependencies
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── .eslintrc.json         # ESLint configuration
```

## Key Files

### graphql/apolloClient.ts
Configures Apollo Client to connect to the Rick and Morty GraphQL API:
```typescript
import { ApolloClient, InMemoryCache, HttpLink} from "@apollo/client"

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://rickandmortyapi.com/graphql"
  }),
  cache: new InMemoryCache()
})

export default client;
```

**Key Components:**
- **HttpLink**: Connects to the GraphQL endpoint at rickandmortyapi.com
- **InMemoryCache**: Stores GraphQL responses in memory for performance
- **ApolloClient**: Main client instance combining link and cache

### graphql/queries.ts
Defines GraphQL queries used throughout the application:
```typescript
import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
  query getEpisodes($page: Int, $filter: FilterEpisode) {
    episodes(page: $page, filter: $filter) {
      info {
        pages
        next
        prev
        count
      }
      results {
        id
        name
        air_date
        episode
      }
    }
  }
`;
```

**Query Details:**
- **getEpisodes**: Fetches paginated episodes from the Rick and Morty API
- **Variables**:
  - `page`: Page number for pagination
  - `filter`: Optional filter options (e.g., by name)
- **Returns**: Episode data including info (metadata) and results (episode details)

### pages/_app.tsx
Application entry point with Apollo Provider integration:
```typescript
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "@/graphql/apolloClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
```

**Key Components:**
- **ApolloProvider**: Makes Apollo Client available to all child components
- **client**: Imported Apollo Client instance
- **Wrapping Components**: All pages now have access to Apollo hooks

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to project directory**:
```bash
cd alx-rick-and-morty-app
```

2. **Dependencies are already installed**, but you can install them manually:
```bash
npm install
```

3. **Install Apollo Client dependencies**:
```bash
npm install @apollo/client graphql @types/graphql
```

## Running the Application

### Development Mode
```bash
npm run dev
```

This starts the development server with hot-reload enabled. Open your browser and navigate to:
```
http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## Using Apollo Client in Components

### With `useQuery` Hook
```typescript
import { useQuery } from "@apollo/client";
import { GET_EPISODES } from "@/graphql/queries";

export default function Episodes() {
  const { loading, error, data } = useQuery(GET_EPISODES, {
    variables: { page: 1 }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.episodes.results.map((episode: any) => (
        <div key={episode.id}>
          <h3>{episode.name}</h3>
          <p>{episode.episode} - {episode.air_date}</p>
        </div>
      ))}
    </div>
  );
}
```

## Key Concepts

### Apollo Client Benefits
- **Automatic Caching**: Responses are cached automatically
- **DevTools Integration**: Browser extension for debugging
- **Normalized Cache**: Prevents duplicate data storage
- **Loading & Error States**: Built-in handling for async operations

### GraphQL Advantages
- **Single Endpoint**: All data fetching through one URL
- **No Over-fetching**: Request only the fields you need
- **No Under-fetching**: Get all related data in one request
- **Strongly Typed**: API schema provides type information

### Tailwind CSS Integration
- **Utility Classes**: Quick styling without writing CSS
- **Responsive Design**: Mobile-first approach with breakpoints
- **Customizable Theme**: Override defaults in tailwind.config.js
- **PurgeCSS**: Unused styles automatically removed in production

## Configuration Files

### tsconfig.json
- **target**: ES2020 - Modern JavaScript features
- **lib**: ES2020, DOM - Library type definitions
- **strict**: true - Strict type checking enabled
- **paths**: `@/*` alias for imports from root

### next.config.js
- Default Next.js configuration
- Optimized for development and production builds

### tailwind.config.js
- Extends default Tailwind theme
- Configures CSS processing with PostCSS

## API Documentation

### Rick and Morty GraphQL Endpoint
URL: `https://rickandmortyapi.com/graphql`

### Available Queries
- **episodes**: Fetch episodes (supports pagination and filtering)
- **characters**: Fetch characters (supports pagination and filtering)
- **locations**: Fetch locations (supports pagination and filtering)

## Learning Outcomes

By completing this task, you will understand:
- ✅ How to set up a Next.js project with modern tooling
- ✅ How to configure Apollo Client for GraphQL APIs
- ✅ How to integrate Apollo Provider for global state management
- ✅ How TypeScript improves development experience
- ✅ How to use Tailwind CSS for rapid UI development
- ✅ The benefits of GraphQL in frontend applications
- ✅ How to structure a professional React application

## Next Steps

1. **Create Components**: Build episode list, character search, and detail pages
2. **Add State Management**: Use Apollo Client hooks for data fetching
3. **Implement Pagination**: Navigate through episodes and characters
4. **Add Filtering**: Filter by status, species, or episode name
5. **Enhance UI**: Style with Tailwind CSS utilities
6. **Error Handling**: Implement error boundaries and loading states
7. **Deploy**: Host on Vercel or other hosting platforms

## Running the Development Server

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

### Port 3000 Already in Use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux
lsof -ti:3000 | xargs kill -9
```

### Module Not Found
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Type Errors
- Ensure TypeScript strict mode is enabled
- Check import paths use `@/` alias correctly
- Verify all packages have type definitions (`@types/package`)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Rick and Morty API](https://rickandmortyapi.com/)

## Conclusion

This project provides a solid foundation for building GraphQL-powered React applications. The combination of Next.js, Apollo Client, TypeScript, and Tailwind CSS creates a professional development environment suitable for production applications.

The skills demonstrated here—GraphQL query writing, state management, component architecture, and modern tooling—are directly applicable to enterprise-level web development.
