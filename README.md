# Hotel Maerkli Information App

A mobile-first, multilingual web application providing comprehensive guest information for Hotel Maerkli in Santo Ângelo, RS, Brazil.

## Features

- **Mobile-First Design**: Optimized for smartphones and tablets
- **Multilingual Support**: Portuguese (primary), English, and Spanish
- **Offline Functionality**: Works without internet connection using Service Worker
- **Responsive Design**: Adapts to different screen sizes
- **Interactive Accordions**: Expandable sections for easy navigation
- **Contact Integration**: Direct phone and website links

## Project Structure

```
hotel-maerkli-app/
├── index.html              # Main HTML file
├── css/
│   └── main.css            # Styles with mobile-first approach
├── js/
│   └── app.js              # JavaScript functionality
├── data/
│   └── content.json        # Multilingual content
├── sw.js                   # Service Worker for offline functionality
└── README.md               # This file
```

## Hotel Information Included

- **General Information**: Check-in/out times, WiFi, parking
- **Dining**: Breakfast details and nearby restaurants
- **Entertainment**: TV channel listings
- **Policies**: Smoking and pet policies
- **Contact Information**: Phone, website, social media
- **Local Attractions**: Nearby tourist destinations
- **Business Facilities**: Meeting rooms and event spaces

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies
- **Service Worker**: Offline functionality
- **JSON**: Content management

## Setup Instructions

1. Clone or download the project files
2. Serve the files from a local server (required for Service Worker)
3. Access via mobile browser or QR code

### Local Development Server

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server package)
npx http-server

# Using PHP
php -S localhost:8000
```

## Deployment to GitHub Pages

1. Create a new GitHub repository
2. Upload all project files
3. Enable GitHub Pages in repository settings
4. Access via the generated GitHub Pages URL

## Browser Support

- iOS Safari 12+
- Chrome Mobile 70+
- Samsung Internet 10+
- Firefox Mobile 68+

## Hotel Maerkli Details

- **Location**: Avenida Brasil, 1000 - Centro, Santo Ângelo, RS
- **Phone**: +55 55 3313-2127
- **Website**: https://www.maerkli.com
- **Classification**: 2-star hotel with 62 rooms
- **TripAdvisor**: #1 of 3 hotels in Santo Ângelo

## License

This project is created for Hotel Maerkli's guest information purposes.

## Contact

For technical support or updates, please contact the development team.