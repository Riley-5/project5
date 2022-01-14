document.addEventListener('DOMContentLoaded', () => {
    // Generate map
    loadMap();
})

function loadMap() {
    // Create map instance
    var map = L.map('map').setView([51.5072, 0.1276], 13);

    // Add basemap
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Load points on map
    fetch('/send_points')
    .then(response => response.json())
    .then(points => {
        // Add points to map
        points.forEach(function(point) {
            var newMarker = L.marker()

            newMarker
                .setLatLng([point.latitude, point.longitude])
                .addTo(map);

            // Change color of marker based on form input
            var accidentIcon = L.divIcon({
                className: 'accidentIcon'
            });

            var potholeIcon = L.divIcon({
                className: 'potholeIcon'
            });

            var icon

            switch (point.value) {
                case 'accident':
                    icon = accidentIcon;
                    break
                case 'pothole':
                    icon = potholeIcon;
                    break
            }

            newMarker.setIcon(icon);
        });
    });

    // Click on map to add point
    map.on('click', addPoint);

    function addPoint(e) {

        // Add marker to map on click
        var marker = L.marker();
            
        marker
            .setLatLng(e.latlng)
            .addTo(map);

        var popup = L.popup();

        // Bind a popup with a form to the newly added marker
        var popupContent = `
            <form id="form">
                <select id="incident">
                    <option value="pothole">Pothole</option>
                    <option value="accident">Accident</option>
                </select>
                <br>
                <button type="submit" value="submit">Submit</button>
            </form>
        `;

        popup.setContent(popupContent);

        marker
            .bindPopup(popup)
            .openPopup();

        // Submit the form and close the popup
        document.querySelector('#form').onsubmit = sendForm;

        function sendForm(e) {
            e.preventDefault();
            formValue = document.querySelector('#incident').value;

            // Send value to backend
            fetch('/point', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: marker.getLatLng().lat,
                    longitude: marker.getLatLng().lng,
                    formValue: formValue
                })
            })
            .then(response => response.json())
            .then(point => {
                console.log('Success:', point);
            })
            .catch((error) => {
                console.log('Error:', error);
            });

            // Change color of marker based on form input
            var accidentIcon = L.divIcon({
                className: 'accidentIcon'
            });

            var potholeIcon = L.divIcon({
                className: 'potholeIcon'
            });

            var icon

            switch (formValue) {
                case 'accident':
                    icon = accidentIcon;
                    break
                case 'pothole':
                    icon = potholeIcon;
                    break
            }

            marker.setIcon(icon);
            
            // Submit form close all popups
            map.closePopup();
        }
    }
}
