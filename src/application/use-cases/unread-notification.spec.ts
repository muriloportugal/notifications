import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './erros/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread Notification', () => {
  it('sould be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existent notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    //Aqui como estamos esperando que o método de ler uma notificação falhe,
    //então colocamos o método de ler a notificação dentro do "expect" e usamos o rejects.toThrow()
    //para avisar que esperando que essa promise rejeite (pois o retorno do método é uma promise) e retorna
    //um erro do tipo NotificationNotFound
    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
