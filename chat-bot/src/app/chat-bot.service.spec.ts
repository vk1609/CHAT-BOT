import { TestBed } from '@angular/core/testing';

import { ChatbotService } from './chat-bot.service';

describe('ChatBotService', () => {
  let service: ChatbotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatbotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
