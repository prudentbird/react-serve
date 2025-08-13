# create-reactend

> CLI tool for bootstrapping new Reactend applications

## Usage

Create a new Reactend app:

```bash
npx create-reactend my-app
cd my-app
npm install
npm run dev
```

## Options

```bash
npx create-reactend [project-name] [options]

Options:
  -t, --template <template>  Template to use (default: "basic")
  -h, --help                 Display help
  -V, --version             Display version
```

## Templates

### Basic

A simple Reactend application with:

- Welcome endpoint
- Users CRUD operations
- Health check endpoint
- Hot reload setup
- TypeScript configuration

## What's Included

When you create a new Reactend app, you get:

```
my-app/
├── src/
│   └── index.tsx     # Main application
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
└── README.md         # Project documentation
```

## Scripts

The generated project includes these npm scripts:

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run typecheck` - Run TypeScript type checking

## Getting Help

- [Reactend Documentation](https://github.com/your-username/reactend)
- [Report Issues](https://github.com/your-username/reactend/issues)

## License

MIT
