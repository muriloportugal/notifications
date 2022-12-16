import { Notification } from '@application/entities/notification';
//Esse é um outro mapper igual ao PrismaNotificationMapper, sere para pegar a notificação e tratar os parâmetros para a saída esperada
//Poderia deixar o nome da pasta no lugar de views-models para http-mappers também...
export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
