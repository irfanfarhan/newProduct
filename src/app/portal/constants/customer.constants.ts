export const ProfileSearchDropDown = [
    { label: 'Email', value: 'Email', code: 'GetProfile' },
    { label: 'Loyalty Card', value: 'Loyalty Card', code: 'GetProfileByLoyaltyCard' }
];

export const ListrakOptions = [
    { label: 'Subscribe', value: 'Subscribed', code: 'ListrakSubscribe' },
    { label: 'Unsubscribe', value: 'UnSubscribed', code: 'ListrakUnSubscribe' },
];

export const SuccessMessages = {
    ProfileUpdateSuccessMessage: 'Profile has been updated successfully',
    ProfileDeleteSuccessMessage: 'Profile has been deleted successfully',
    ProfilePasswordSuccessMessage: 'Password has been updated successfully',
    RefundSuccessMessage: 'Refund successfully',
    CreditCardDeleteSuccessMessage: 'Card has been deleted successfully',
    UpdateListrackSuccessMessage: 'Listrack has been updated successfully',
    KountUpdateSuccessMessage: 'Whitelist has been updated successfully',
    AddSvCardSuccessMessage: 'Stored Card added successfully',
    SvCardDeleteSuccessMessage: 'Stored Card has been deleted successfully',
    UpdateSvCardSuccessMessage: 'Stored Card has been updated successfully',
    BalanceTransferSuccessMessage: 'Balance Transfer has been updated successfully',
}

export const StatusesDropDown = [
    { label: 'Approve', value: 'approve', code: 'A', inactive: false},
    { label: 'Review', value: 'review', code: 'R', inactive: false },
    { label: 'Decline', value: 'decline', code: 'D', inactive: false },
    { label: 'None', value: 'NA', code: null, inactive: true }
];

export const AmountDropdown = [
    10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100
];

Object.freeze(ProfileSearchDropDown);
Object.freeze(ListrakOptions);
Object.freeze(SuccessMessages);
Object.freeze(StatusesDropDown);