import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './erros/notification-not-found';

describe('Cancel Notification', () => {
  it('sould be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    //Para testar o cancelamento, antes de cancelar vamos precisar criar uma notificação.
    const notification = makeNotification();

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].cancelAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existent notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    //Aqui como estamos esperando que o método de cancelar uma notificação falhe,
    //então colocamos o método de cancelar a notificação dentro do "expect" e usamos o rejects.toThrow()
    //para avisar que esperando que essa promise rejeite (pois o retorno do método cancelNotification é uma promise) e retorne
    //um erro do tipo NotificationNotFound
    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notificationId',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
