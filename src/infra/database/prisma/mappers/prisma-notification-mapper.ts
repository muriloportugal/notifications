import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.createdAt,
      createdAt: notification.createdAt,
    };
  }

  //Essa é a notificação que vem do primsa e vamos converter para ficar da mesma classe que nossa Notificacao da pasta Entities
  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.createdAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
