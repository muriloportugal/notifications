import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('sould be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'teste-recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'teste-recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'teste-recipient-2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'teste-recipient-1',
    });

    expect(count).toEqual(2);
  });
});
