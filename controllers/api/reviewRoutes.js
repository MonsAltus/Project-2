const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');

// Post  (require login session)
router.post('/', withAuth, async (req, res) => {
    try{
        const newReview = await Review.create({
            ...req.body,
            user_id: req.session.user_id
            // Product id???
        });
        res.status(200).json(newReview)
    } catch (err) {
        res.status(400).json(err);
    }
});

// Delete by id  (require login session)
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const newReview = await Review.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
        });
        if(!newReview) {
            res.status(404).json({ message: 'No Review found with this id.'});
            return;
        }
        res.status(200).json(newReview);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;