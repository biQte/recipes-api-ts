import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({recipes: {
        firstRecipe: 'first'
    }});
});

export default router;