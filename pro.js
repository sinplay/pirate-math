var app = new Vue({
    el: '#trafficDetail',
    data: {
        trafficBlocks: [],
    },
    methods: {
        add: () => {
            firebase.database().ref('/cmTraffic').push({
                Username: document.getElementById("r").value,
                status: document.getElementById("reportForm").elements["status"].value,
                hour: document.getElementById('h').value,
                min: document.getElementById('m').value,
            });
            document.getElementById("reportForm").reset()
        },
        deleteMessage: (trafficBlock) => {
            firebase.database().ref('/cmTraffic/' + trafficBlock.id).remove()
        }
    }
})
var config = {
    apiKey: "AIzaSyAowNBzD1DvNpkzLijhEQTOjWS3wY2I_hQ",
    authDomain: "mathcamp-4c488.firebaseapp.com",
    databaseURL: "https://mathcamp-4c488.firebaseio.com",
    projectId: "mathcamp-4c488",
    storageBucket: "mathcamp-4c488.appspot.com",
    messagingSenderId: "917876865674"
  };

var convertFromFirebase = (data) => {
    var emptyData = []
    if (data == null || data == undefined) {
        return []
    }

    var ids = Object.keys(data)
    return ids.map(id => {
        var beforeInfo = data[id]
        beforeInfo.id = id
        return beforeInfo
    })

}
firebase.initializeApp(config);
var database = firebase.database();
var trafficDatabase = database.ref('/cmTraffic')
trafficDatabase.on("value", (trafficBlocks) => {
    var data = convertFromFirebase(trafficBlocks.val()).reverse()
    app.trafficBlocks = data
})

function saveData(roadName, status, hour, min ,sec) {
    firebase.database().ref('/cmTaffic').push({
        roadName: roadName,
        status: status,
        hour: hour,
        min: min,
    });
}