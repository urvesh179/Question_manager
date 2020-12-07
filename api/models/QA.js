const mongoose=require("mongoose");

const QASchema=mongoose.Schema({
   
    languageId:
    {
        type:Array,
        required:true,
        ref:"Language"
    },
    questions:
    {
        type:String,
        required:true
    },
    answers:
    {
        type:Array,
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

const QA = mongoose.model("QA", QASchema);

module.exports = QA;