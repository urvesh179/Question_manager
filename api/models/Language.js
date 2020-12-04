const mongoose=require("mongoose");

const LanguageSchema=mongoose.Schema({
   
    name:
    {
        type:String,
        required:true,
        unique:true
    },
    description:
    {
        type:String
    },
    is_deleted:
    {
        type:Boolean,
        required:true,
        default:false
    }
},
{
    timestamps: true,
});

LanguageSchema.virtual('QA', {
    ref: 'QA',
    localField: '_id',
    foreignField: 'languageId'
})

const Language = mongoose.model("Language", LanguageSchema);

module.exports = Language;