import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserNotificationService } from '@core/services/api/user-notification.service';
import { UserNotificationBulkUpdateDTO } from '@shared/models/dto/user-notification.dto';
import { NotificationGetListDataRO } from '@shared/models/ro/notification.ro';

@Component({
  selector: 'app-notification-items',
  styleUrls: ['notification-items.component.scss'],
  templateUrl: 'notification-items.component.html',
})
export class NotificationItemsComponent {
  @Input() notifications: NotificationGetListDataRO[] = [];
  @Input() showCheckbox = true;
  @Input() notificationIdsChecked: number[] = [];

  @Output() notificationIdsCheckedChange = new EventEmitter<number[]>();
  onCheckNotificationIdsChange() {
    this.notificationIdsCheckedChange.emit(this.notificationIdsChecked);
  }

  exerciseImageUrl =
    'https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  constructor(
    private _userNotificationService: UserNotificationService,
    private router: Router,
  ) {}

  routeToNotification(notification: NotificationGetListDataRO) {
    const dto = new UserNotificationBulkUpdateDTO();
    dto.notificationIds = [notification.id];
    dto.isRead = true;
    this._userNotificationService.bulkUpdate(dto).subscribe(() => {
      this.notifications = this.notifications.map(notification => {
        if (notification.id === dto.notificationIds[0]) {
          notification.isRead = true;
        }
        return notification;
      });
    });

    if (notification.commentId) {
      if (notification.commentParentId) {
        this.router.navigate(['comment', notification.commentParentId], { queryParams: { highlightedCommentId: notification.commentId } });
      } else {
        this.router.navigate(['comment', notification.commentId]);
      }
    } else if (notification.assignmentId) {
      this.router.navigate(['assignment', notification.assignmentId]);
    } else if (notification.lessonId) {
      if (!notification.courseId) {
        this.router.navigate(['/course/deleted']);
      }

      if (!notification.sectionId || !notification.lessonId) {
        this.router.navigate(['/course/lesson-deleted']);
      }

      this.router.navigate(['/course', notification.courseId, 'section', notification.sectionId, 'lesson', notification.lessonId]);
    } else if (notification.exerciseId) {
      this.router.navigate(['/exercise', notification.exerciseId]);
    } else if (notification.postId) {
      this.router.navigate(['/course', notification.courseId, 'post', notification.postId]);
    } else if (notification.exerciseSubmitId) {
      this.router.navigate(['/exercise', notification.exerciseSubmitId]);
    }
  }

  onCheckBoxChange(checked: boolean, id: number) {
    if (checked) {
      this.notificationIdsChecked.push(id);
    } else {
      const index = this.notificationIdsChecked.indexOf(id);
      if (index > -1) {
        this.notificationIdsChecked.splice(index, 1);
      }
    }

    this.onCheckNotificationIdsChange();
  }
}
