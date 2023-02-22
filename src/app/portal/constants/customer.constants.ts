export const ProfileSearchDropDown = [
    { label: 'Email', value: 'Email', code: 'A' },
    { label: 'Loyalty Card', value: 'Loyalty Card', code: 'GetProfileByLoyaltyCard' }
];

export const ListrakOptions = [
    { label: 'Subscribe', value: 'Subscribed', code: 'ListrakSubscribe' },
    { label: 'Unsubscribe', value: 'Unsubscribed', code: 'ListrakUnSubscribe' },
];

export const SuccessMessages = {
    ProfileUpdateSuccessMessage: 'Profile has been updated successfully',
    ProfileDeleteSuccessMessage: 'Profile has been deleted successfully',
    ProfilePasswordSuccessMessage: 'Password has been updated successfully',
    RefundSuccessMessage: 'Refund successfully',
    CreditCardDeleteSuccessMessage: 'Card has been deleted successfully',
    UpdateListrackSuccessMessage: 'Listrack has been updated successfully',
    KountUpdateSuccessMessage: 'Whitelist has been updated successfully',
}

export const StatusesDropDown = [
    { label: 'Approve', value: 'approve', code: 'A' },
    { label: 'Review', value: 'review', code: 'R' },
    { label: 'Decline', value: 'decline', code: 'D' },
    { label: 'None', value: 'none', code: '' }
];

Object.freeze(ProfileSearchDropDown);
Object.freeze(ListrakOptions);
Object.freeze(SuccessMessages);
Object.freeze(StatusesDropDown);