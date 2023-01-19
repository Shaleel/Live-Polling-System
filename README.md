# Live polling system

[Live Preview](https://live-polling-system-production.up.railway.app/).

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <p align="center">
    A live polling system built using socket.io library
    <br />
    <a href="https://live-polling-system-production.up.railway.app/">View Demo</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## Steps to replicate

#### Backend

-   Node has to be installed onto your system

-   add a `.env` file into the parent directory with the following contents:

```
//a connection url for the mongoDB
DATABASE = mongodb+srv://<username>:<password>@<cluster_name>/
ContactApp?retryWrites=true&w=majority
PORT = 8000
```

-   Installing the dependencies

```
npm install
```

-   Starting the app

```
npm start
```

it will build the front end react app and serve it through our NodeJS server on
`http://localhost:8000`

## Contact

Shaleel Ahmed -
[Linkedin](https://www.linkedin.com/in/shaleel-ahmed-2a34761a9/) -
shaleelahmed3@gmail.com

Project Link:
[Github](https://github.com/Shaleel/Live-Polling-System/tree/main/front-end)

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

I would like to give credit to the following resources that have helped me in
creating this project successfully!

-   [Socket.io](https://socket.io/)
-   [Mongoose Docs](https://mongoosejs.com/)
