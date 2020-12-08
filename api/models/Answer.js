const mongoose=require("mongoose");

const AnswerSchema=mongoose.Schema({
   
    questionId:
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Question"
    },
    answer:
    {
        type:String,
        required:true
    },
    isDeleted:
    {
        type:Boolean,
        required:true,
        default:false
    }
},
{
    timestamps: true,
});

const Answer = mongoose.model("Answer", AnswerSchema);

module.exports = Answer;