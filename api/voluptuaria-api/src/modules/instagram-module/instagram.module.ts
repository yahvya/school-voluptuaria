import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InstagramScrapingService } from './services/instagram-scraping.service';

@Module({
    imports: [ConfigModule],
    providers: [InstagramScrapingService],
    exports: [InstagramScrapingService]
})
export class InstagramModule {} 