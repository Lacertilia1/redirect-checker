# Redirect Checker

A simple Node.js script for checking HTTP redirects across large lists of URLs. The script reads URLs from a text file, sends requests without following redirects, and exports the results to a CSV file.

<img width="1200" alt="Example of results.csv" src="https://github.com/user-attachments/assets/55fb8bcf-4ee2-4027-ad73-1ace2cfdda06" />


## How It Works

1. Put your URLs in the `urls.txt` file, one URL per line.
2. Run the script:
   ```bash
   node script.js
   ```
3. The script generates a results.csv file with three columns:
   - url — the original URL
   - status — the HTTP status code
   - redirect_to — the value of the Location header (if present)

## Requirements

Node.js 18+ (uses the built-in fetch API)

## Features

- Processes large URL lists (1000+ entries)
- Detects redirects without following them
- Outputs clean CSV results
- Minimal dependencies

## File Structure

```bash
redirect-checker/
  ├── script.js
  ├── urls.txt
  ├── results.csv (generated)
  ├── package.json
  ├── .gitignore
  └── README.md
```

## Test URLs

For testing purposes, you may use endpoints from httpbin.org:

```bash
https://httpbin.org/status/200
https://httpbin.org/redirect-to?url=https://example.com
https://httpbin.org/redirect/2
https://httpbin.org/status/404
https://httpbin.org/status/500
```
