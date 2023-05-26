const { Event, Reply, Comment } = require('../models/eventModel');
const User = require('../models/userModel')

//Kaam chalau
const getAllComments = async(req,res)=>{
    console.log('get comments')
    try {
        let comments = await Comment.find({}).populate('user');;
        // comments = comments.map(async (e)=>{
        //     const user = await e
        // })
        console.log(comments)
        res.status(200).json(comments);
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
}

// Controller function to add a comment to an event
const addComment = async (req, res) => {
    const { eventId, email, content } = req.body;
    console.log(content)
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }   

        const user = await User.find({email})
        console.log(user[0])
        const newComment = new Comment({
            user: user[0]._id,
            content,
            eventId
        })
        
        await newComment.save()
        .then(comment=> {const id = comment._id;
            event.comments.push(id);
        });

        await event.save();

        res.status(200).json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Controller function to add a reply to a comment
const addReply = async (req, res) => {
    const { eventId, commentId, content } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        const newReply = new Reply({
            user: userId,
            content: content
        });
        await newReply.save()
        .then(reply=>{const id = reply._id});

        comment.replies.push(id)
        await comment.save();

        res.status(200).json({ message: 'Reply added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { addComment, addReply, getAllComments };