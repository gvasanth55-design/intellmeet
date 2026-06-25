export const mockMessages = [
  { id: 'msg1', meetingId: 'm1', senderId: 'u2', senderName: 'Sarah Chen', text: 'Good morning everyone! Ready for the sprint planning?', time: new Date(Date.now() - 600000).toISOString() },
  { id: 'msg2', meetingId: 'm1', senderId: 'u4', senderName: 'Emma Wilson', text: 'Morning! I have the backlog ready.', time: new Date(Date.now() - 590000).toISOString() },
  { id: 'msg3', meetingId: 'm1', senderId: 'u3', senderName: 'Mike Rivera', text: 'Can we review the design tickets first?', time: new Date(Date.now() - 580000).toISOString() },
  { id: 'msg4', meetingId: 'm1', senderId: 'u1', senderName: 'Alex Johnson', text: 'Sure, lets start with INT-234 and INT-235', time: new Date(Date.now() - 570000).toISOString() },
  { id: 'msg5', meetingId: 'm1', senderId: 'u2', senderName: 'Sarah Chen', text: 'Both are estimated at 3 story points each.', time: new Date(Date.now() - 560000).toISOString() },
  { id: 'msg6', meetingId: 'm1', senderId: 'u4', senderName: 'Emma Wilson', text: 'I can take INT-234 if thats okay.', time: new Date(Date.now() - 550000).toISOString() },
];

export const mockNotifications = [
  { id: 'n1', type: 'meeting', title: 'Meeting started', message: 'Sprint Planning - Week 24 has started.', time: new Date(Date.now() - 600000).toISOString(), read: false },
  { id: 'n2', type: 'invite', title: 'Meeting invitation', message: 'You are invited to Architecture Review.', time: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: 'n3', type: 'recording', title: 'Recording available', message: 'Client Demo recording is ready to view.', time: new Date(Date.now() - 86400000).toISOString(), read: true },
  { id: 'n4', type: 'summary', title: 'AI Summary ready', message: 'Summary for Design Review is generated.', time: new Date(Date.now() - 172800000).toISOString(), read: true },
];
