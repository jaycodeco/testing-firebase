document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();

  const db = firebase.firestore();

  const humans = db.collection("posts");

  const living = humans.where("alife", "==", true);

  living.onSnapshot((docs) => {
    docs.forEach((doc) => {
      const data = doc.data();
      console.log(`<h1>${data.user_name}</h1>`);
      console.log(`<h2>${data.alife}</h2>`);
    });
  });
});

async function google_in() {
  const provider = new firebase.auth.GoogleAuthProvider();
  res = await firebase.auth().signInWithPopup(provider);
  user = res.user;

  document.querySelector("h1").innerText = `Hello from ${user.displayName}`;
}

async function uploadFile(files) {
  const file = files.item(0);
  const stg_ref = firebase.storage().ref();
  const file_ref = stg_ref.child(file.name);

  const task = await file_ref.put(file);

  const storage = firebase.storage();

  storage
    .ref(file.name)
    .getDownloadURL()
    .then((url) => {
      document.querySelector("#imgUP").setAttribute("src", url);
      console.log("ok");
      console.log(file);
    });
}
