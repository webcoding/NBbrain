import qbanksModel from '../schema/qbankSchema.js';
export async function getQuestion(qbank_id, index){
  index = parseInt(index);
  return await qbanksModel.findOne(
    {qbank_id:qbank_id},
    {questions: {$slice:[index, index+1]}}
    // {questions: {$elemMatch: {question_id:question_id}}}
  ).exec();
}
