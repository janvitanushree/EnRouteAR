AFRAME.registerComponent('gps-camera-debug', {
    init: function () {
        const camera = this.el;

        // Debug component to display camera position
        setInterval(() => {
            const position = camera.getAttribute('position');
            console.log('Camera Position:', position);
        }, 5000);
    },
<<<<<<< HEAD
<<<<<<< HEAD
});
=======
});
>>>>>>> be32b1a (Add new file)
=======
});
>>>>>>> 45bd8b96236a41585e4c493df4848541f6cdfcf5
