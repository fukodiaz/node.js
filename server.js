const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');// Templater

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, 'localhost', (error) => {
	error ? console.log(error) : console.log(`Server is listening port ${PORT}`);
});


app.use(morgan(':method :url :status :res[content-length] - :response-time ms') );

app.use(express.static('styles'));


app.get('/', (req, res) => {
	//res.send('<h1>Hell</h1>');
	const title = 'Home';

	res.render(createPath('index'), {title}); // render()
});


app.get('/contacts', (req, res) => {
	const title = 'Contacts';
	const contacts = [
		{name: 'YouTube', link: 'https://youtube.com'},
		{name: 'GitHub', link: 'https://github.com'}
	];

	res.render(createPath('contacts'), {contacts, title});
});

app.get('/about-us', (req, res) => {
	res.redirect('/contacts');
});

app.get('/posts/:id', (req, res) => {
	const title = 'Post';

	res.render(createPath('post'), {title});
});

app.get('/posts', (req, res) => {
	const title = 'Posts';

	res.render(createPath('posts'), {title});
});

app.get('/add-post', (req, res) => {
	const title = 'Add post';

	res.render(createPath('add-post'), {title});
});

app.use((req, res) => {
	//res.statusCode = 404;
	const title = 'Error';

	res
		.status(404)
		.render(createPath('error'), {title});
});
