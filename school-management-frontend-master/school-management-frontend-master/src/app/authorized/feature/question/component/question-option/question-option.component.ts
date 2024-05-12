import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum IQuestionOptionStatus {
  NORMAL = 'normal',
  SELECTED = 'selected',
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
}

@Component({
  selector: 'app-question-option',
  styleUrls: ['question-option.component.scss'],
  templateUrl: 'question-option.component.html',
})
export class QuestionOptionComponent {
  @Input() status?: IQuestionOptionStatus;
  @Input() name: string;
  @Input() label: string;
  @Input() showAutorenew = true;
  @Input() showTrash = true;
  @Input() isMultipleChoice: boolean;
  @Input() showCheckbox: boolean;
  @Input() disabled: boolean;

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter();
  onSelectedChange() {
    this.selectedChange.emit(this.selected);
  }

  IQuestionOptionStatus = IQuestionOptionStatus;

  @Output() onRemoveClick = new EventEmitter();
  removeClick() {
    this.onRemoveClick.emit();
  }

  @Output() onToggleCorrect = new EventEmitter();
  toggleCorrect() {
    if (this.status === IQuestionOptionStatus.CORRECT) {
      this.status = IQuestionOptionStatus.INCORRECT;
    } else {
      this.status = IQuestionOptionStatus.CORRECT;
    }

    this.onToggleCorrect.emit();
  }

  checkboxClick($event) {
    if (this.disabled) {
      $event.preventDefault();
    }
  }

  radioClick($event) {
    if (this.disabled) {
      $event.preventDefault();
    }
  }
}
