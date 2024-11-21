const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// App setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/merncrud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Schema and Model
const ItemSchema = new mongoose.Schema({
    name: String,
    description: String,
});
const Item = mongoose.model('Item', ItemSchema);
// CRUD Routes
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});
app.post('/items', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.json(newItem);
});
app.put('/items/:id', async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
});
app.delete('/items/:id', async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
});
// Start server
app.listen(5000, () => console.log('Server running on port 5000'));









