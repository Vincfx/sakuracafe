# Sakura Café Website

A beautiful, responsive website for a sakura-themed café, featuring a modern design with Japanese cherry blossom aesthetics.

## Features

- **Responsive Design**: Mobile-first approach ensuring perfect display on all devices
- **Sakura Theme**: Beautiful cherry blossom inspired color scheme and animations
- **Interactive Elements**: Menu filtering, testimonial slider, and reservation system
- **Animated Elements**: Falling sakura petals and scroll animations
- **Comprehensive Sections**: Home, Menu, About, Gallery, Testimonials, Reservation, and Contact

## Project Structure

```
├── index.html              # Main HTML file
├── css/
│   ├── styles.css         # Main stylesheet
│   └── responsive.css     # Mobile-responsive styles
├── js/
│   └── main.js            # JavaScript functionality
├── images/
│   ├── logo.svg           # Sakura Café logo
│   ├── hero-bg.jpg        # Background images (not included)
│   ├── reservation-bg.jpg # Background images (not included)
│   ├── menu/              # Menu item images (not included)
│   ├── gallery/           # Gallery images (not included)
│   ├── about/             # About section images (not included)
│   └── testimonials/      # Testimonial author images (not included)
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository**
   ```
   git clone [repository-url]
   cd sakura-cafe-website
   ```

2. **Open in a web browser**
   - Simply open the `index.html` file in any modern web browser
   - Alternatively, use a local development server:
     ```
     # Using Python
     python -m http.server
     
     # Using Node.js (with http-server installed)
     npx http-server
     ```

3. **Adding Images**
   - Create the following directories in the `images` folder:
     - `menu/`
     - `gallery/`
     - `about/`
     - `testimonials/`
   - Add appropriate images to each directory as referenced in the HTML

## Customization

### Colors

The color scheme can be easily modified by changing the CSS variables in the `:root` selector in `styles.css`:

```css
:root {
    --primary-color: #f8c8dc; /* Light pink */
    --primary-dark: #e4a3b8;  /* Darker pink */
    --accent-color: #8d3f63;  /* Deep rose */
    /* ... other variables ... */
}
```

### Content

Update the content in `index.html` to match your café's information:

- Menu items and prices
- About section text and images
- Contact information
- Gallery images
- Testimonials

## Browser Compatibility

This website is compatible with all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Credits

- Fonts: Google Fonts (Poppins, Playfair Display)
- Icons: Font Awesome
- Design & Development: [Your Name/Company]

## License

[Choose an appropriate license for your project]