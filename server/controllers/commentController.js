const { Event, Reply, Comment } = require('../models/eventModel');
const User = require('../models/userModel')

// Controller function to add a comment to an event
const addComment = async (req, res) => {
    const { eventId, email, content } = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        const user = await User.find({email})
        const newComment = new Comment({
            user: user._id,
            content
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

module.exports = { addComment, addReply };