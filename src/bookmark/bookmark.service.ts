import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private _prisma: PrismaService) {}

  getBookmarks(userId: number): any {
    return this._prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

   getBookmarkById(
    userId: number,
    bookmarkId: number,
  ): any {
    return this._prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId: userId
      },
    });
  }

  async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ): Promise<any> {
    const bookmark =
      await this._prisma.bookmark.create({
        data: {
          userId: userId,
          ...dto,
        },
      });
    return bookmark;
  }

  async editBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ): Promise<any> {
    const bookmark =
      await this._prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException(
        "Bookmark doesn't exist!",
      );
    }
    return this._prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkBuId(
    userId: number,
    bookmarkId: number,
  ): Promise<any> {
    const bookmark =
      await this._prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });
    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException(
        "Bookmark doesn't exist!",
      );
    }

    return this._prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
