import { Component } from '@angular/core';
import quizzQuestions  from "../../../assets/data/quizzQuestions.json"
@Component({
  selector: 'app-quizz',
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {
  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string = ""

  questionIndex:number = 0
  questionMaxIndex:number = 0

  finished:boolean = true

  ngOnInit():void {
    if(quizzQuestions) {
      this.finished = false

      this.questions = quizzQuestions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
      
    }
  }

  playerChoice(value:string) {
    this.answers.push(value)
  }

  async nextStep() {
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizzQuestions.results[finalAnswer as keyof typeof quizzQuestions.results]
    }
  }

  async checkResult(answers:string[]) {
    const result = answers.reduce((previous, current, i, arr)=>{
      if(
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous
      } else {
        return current
      }
    })
     return result
  }
}
