AFRAME.registerComponent('gps-entity-place', {
    schema: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
    },

    init: function () {
        const { latitude, longitude } = this.data;
        console.log(`Entity placed at latitude: ${latitude}, longitude: ${longitude}`);
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
