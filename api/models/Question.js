const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({

   
    languageId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Language"
    }],
    question:
    {
        type: String,
        required: true
    },
    isDeleted:
    {
        type: Boolean,
        required: true,
        default: false
    }
},
    {
        timestamps: true,
    });

QuestionSchema.virtual('Answer', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'questionId'
})

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;