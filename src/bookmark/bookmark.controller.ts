import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private _bookmarkService: BookmarkService,
  ) {}

  @Get()
  public getBookmarks(
    @GetUser('id') userId: number,
  ): any {
    return this._bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  public getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ): any {
    return this._bookmarkService.getBookmarkById(userId, bookmarkId);
  }

  @Post()
  public createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ): any {
    return this._bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
  public editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto:EditBookmarkDto
  ): any {
    return this._bookmarkService.editBookmarkById(userId, bookmarkId, dto);
  }

  @Delete(':id')
  public deleteBookmarkBuId(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ): any {
    return this._bookmarkService.deleteBookmarkBuId(userId, bookmarkId);
  }
}
