import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent, ConfirmDialogModel } from '@core/components/confirm-dialog/confirm-dialog.component';
import { PostGetListDataRO } from '@shared/models/ro/post.ro';
import { getGravatarUrl } from '@shared/util/random-avatar';

@Component({
  selector: 'app-post-item',
  styleUrls: ['post-item.component.scss'],
  templateUrl: 'post-item.component.html',
})
export class PostItemComponent {
  @Input() post: PostGetListDataRO;
  @Input() isStudent: boolean;
  @Input() userId: number;
  @Output() onDelete = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  delete(event: MouseEvent) {
    const dialogData = new ConfirmDialogModel('Xác nhận', 'Bạn có muốn xác nhận xóa không?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.onDelete.emit(this.post.id);
    });

    event.stopPropagation();
  }

  routeToEdit(event: MouseEvent) {
    this.router.navigate([this.post.id, 'edit'], { relativeTo: this.route });
    event.stopPropagation();
  }

  getAvatarUrl() {
    const userId = this.post.createdBy;
    const username = this.post.createdByUsername;
    return this.post.createdByImageUrl || getGravatarUrl(userId, username);
  }
}
